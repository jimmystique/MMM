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
  uint public moneypool = 0;


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


  function sendrewards() payable public{
    //A COMPLETER
    
  }


  function sendETH(uint amount) external {
    msg.sender.transfer(amount);
  }


  function transferETH(address payable _addrTransferTo) payable public {
    _addrTransferTo.transfer(msg.value/3);
  }


}


