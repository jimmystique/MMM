pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
import "./provableAPI.sol";


contract Meme is usingProvable{
   
  struct investment{
    address investorAddr;
    uint amount;
    string link;
  }


  uint public days_n = 0;
  string[] public linksAndOwnersMOTD;
  mapping (uint => string[]) public bestMemesPerSess;
  //LINK TO INVESTMENTS
  mapping(string => investment[]) investmentsMap;
  //ADDRESS TO INVESTMENTS
  mapping (address => investment[]) public investorToInvestments;
  mapping(string => uint) InvestByMemes;
  uint public moneypool = 0;
  uint public Lambda = 0.5 * 1e18;


  constructor () payable public {
    OAR = OracleAddrResolverI(0x340d10f3a238eaf78566017db25C5237F6664893);
  }
 
 
  function __callback( bytes32 _myid, string memory _result) public {
    require(msg.sender == provable_cbAddress());
    updateMOTD(_result);
  }


  function getMyInvestments(address _addr) public view returns (investment[] memory){
    return investorToInvestments[_addr];
  }


  function updateMemes(uint n_days) public payable{
    require(msg.sender == provable_cbAddress());
    provable_query("URL", 'json(https://institutmyloan.fr/Blockchain/bestMemes.php).0',5100000);
  }


  function countDashes(string memory str) public view returns(uint){
    uint nb_dashes = 0;
    for (uint i = 0; i < bytes(str).length;i++){
      if (bytes(str)[i] == 0x2D){
        nb_dashes += 1;
      }
    }
    return nb_dashes;
  }


  function getIndexDashes(string memory str) public view returns (uint [] memory){
    bytes1 a = 0x2D;  
    uint count = 0;
    uint[] memory index_array = new uint[](countDashes(str));
    uint count_index = 0;
    for (uint i = 0; i < bytes(str).length; i++){
        if (bytes(str)[i] == a){
            index_array[count_index] = i;
            count_index += 1;
        }
        count++;
    }
    uint[] memory ret = new uint[](count_index);
    for (uint i = 0; i < count_index; i++){
        ret[i] = index_array[i];
    }
    return ret;
  } 


  function clearOldInvestments() public{
    for (uint i = 0; i < linksAndOwnersMOTD.length/2; i++){
      delete investmentsMap[linksAndOwnersMOTD[i*2]];
    }
  }


  function updateMOTD(string memory str) public{
    days_n += 1;
    delete linksAndOwnersMOTD;
    clearOldInvestments();
    uint[] memory index_dashes = getIndexDashes(str);
    for (uint i = 0; i < index_dashes.length; i++){
        if(i==0){
             bytes memory b = new bytes(index_dashes[0]);
             for (uint j = 0; j < index_dashes[0]; j++){
                 b[j] = bytes(str)[j];
             }
             linksAndOwnersMOTD.push(string(b));
        }else{
            bytes memory b = new bytes(index_dashes[i]-index_dashes[i-1]-1);
            for(uint j = index_dashes[i-1]+1; j < index_dashes[i]; j++){
                b[j-(index_dashes[i-1]+1)] = bytes(str)[j];
            }
            linksAndOwnersMOTD.push(string(b));
        }
    }
    bestMemesPerSess[days_n] = linksAndOwnersMOTD;
  }
    

  function invest(string memory link, uint amount) payable public {
    investment memory inv;
    inv.investorAddr = msg.sender;
    inv.amount = amount;
    inv.link = link;
    bool first = false;

    for( uint i = 0 ; i < investorToInvestments[msg.sender].length ; i++ ){
      if (keccak256(abi.encodePacked(link)) == keccak256(abi.encodePacked(investorToInvestments[msg.sender][i].link))) {
        first = true;
      }
    }
    if(first == false) InvestByMemes[link]++;
    investorToInvestments[msg.sender].push(inv);
    investmentsMap[link].push(inv);
    moneypool += amount;
  }


  function getPoolAmount() public view returns(uint){
    return moneypool;
  }


  function getInvestmentsOfAddr(address _addr) public view returns (investment[] memory){
    return investorToInvestments[_addr];
  }


  function getLinksAndOwnersMOTD() public view returns(string[] memory){
      return linksAndOwnersMOTD;
  }

  
  function getBestMemesPerSess(uint sess_n) public view returns (string[] memory){
      return bestMemesPerSess[sess_n];
  }

  
  function getDay_n() public view returns (uint){
    return days_n;
  }


  function getSmartContractBalance() public view returns (uint256){
    return address(this).balance;
  }


  function storeETH() payable public {    
    
  }

  //Reward part
  function GetBestMeme() public  returns(string memory){

    string memory best = linksAndOwnersMOTD[0];
    uint max = InvestByMemes[best];
    uint creatori = 0;
    for(uint i = 2;i < linksAndOwnersMOTD.length;i = i + 2){

      if(InvestByMemes[linksAndOwnersMOTD[i]] > max){

        best = linksAndOwnersMOTD[i];
        max = InvestByMemes[linksAndOwnersMOTD[i]];
        creatori = i;

    }
      delete InvestByMemes[linksAndOwnersMOTD[i]];
    }
    string memory _addr = linksAndOwnersMOTD[creatori + 1];
    address payable topay = address(uint160(parseAddr(_addr)));
    topay.transfer(moneypool * 5 / 100); //5% Owner
    return best;
  }
  function sendrewards()  public{
    string memory bestmeme = GetBestMeme();
    uint lasti = investmentsMap[bestmeme].length - 1;
    uint[] memory scores = new uint[]( investmentsMap[bestmeme].length);
    uint[] memory norm = new uint[]( investmentsMap[bestmeme].length);
    uint minscore = 0;
    uint maxscore = 0;
    uint sumnorme = 0;
    uint sum = 0;
    address payable RD = 0x510DD0463F258cd64c3C63F186DaBF9F3cEC68E0;
    RD.transfer(moneypool * 5 / 100); //5% R&D
    moneypool = moneypool * 90 / 100; // 90% Gamblers
    for (uint i = 0; i < investmentsMap[bestmeme].length; i++){

      scores[i] = (investmentsMap[bestmeme][i].amount * (lasti - i + 1) ) - (i * Lambda );

      if(minscore == 0) minscore = scores[i];

      if(scores[i] < minscore) minscore = scores[i];
      if(scores[i] > maxscore) maxscore = scores[i];
    }
    for (uint i = 0; i < investmentsMap[bestmeme].length; i++){

      norm[i] = (scores[i]*100000 - minscore) / (maxscore - minscore + 1);
      sumnorme += norm[i];
    }

    for (uint i = 0; i < investmentsMap[bestmeme].length; i++){

       address payable winner = address(uint160(investmentsMap[bestmeme][i].investorAddr));
       winner.transfer(moneypool * norm[i] / sumnorme);
       sum += moneypool * norm[i] / sumnorme;
    }
    moneypool -= sum;
    clearOldInvestments();
    
  }


  function sendETH(uint amount) external {
    msg.sender.transfer(amount);
  }


  function transferETH(address payable _addrTransferTo) payable public {
    _addrTransferTo.transfer(msg.value/3);
  }


}


