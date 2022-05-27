// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract CryptoDevs is ReentrancyGuard, ERC721URIStorage, Ownable, VRFConsumerBase {
    
    using SafeMath for uint256;

    uint256 public tokenCounter;
    uint256 public startingIndex;
    bytes32 internal keyHash;
    uint256 internal fee;

    string public CRYPTODEVS_PROVENANCE = "";

    uint256 public constant MAX_TOKENS = 10;

    mapping(uint256 => bool) public TokenAlive;

    mapping(uint256 => address) public TokenToOwner;

    uint256 private price = 25000000000000000; // 0.025 Ether
    string public baseURI = "";

    bool public isSaleActive = true;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash, uint256 _fee)
     VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721("CryptoDevs", "DEVS") {
        tokenCounter = 1;
        keyHash = _keyhash;
        fee = _fee;
    }

    function setProvenanceHash(string memory _provenanceHash) public onlyOwner {
        CRYPTODEVS_PROVENANCE = _provenanceHash;
    }

    function generateStartingIndex() public onlyOwner returns  (bytes32 requestId){
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        startingIndex = randomness;
    }
        

    
    // my NFT tokenID starts from 1 to N
    function mint() public payable {
        require(isSaleActive, "Sale is not active" );
        require(tokenCounter < MAX_TOKENS + 1, "Exceeds maximum tokens available for purchase");
        require(msg.value >= price, "token value sent is not correct");
        uint256 tokenId = (tokenCounter + startingIndex) % MAX_TOKENS;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, formatTokenURI(tokenId));
        TokenToOwner[tokenId] = msg.sender;
        TokenAlive[tokenId] = true;
        tokenCounter = tokenCounter + 1;
    }

    function burn(uint256 tokenId) public {
        require(TokenToOwner[tokenId] == msg.sender, "You are not the owner of this NFT");
        require(TokenAlive[tokenId] == true, "This NFT is already burned!");
        _burn(tokenId);
        TokenAlive[tokenId] = false;
    }

    function formatTokenURI(uint256 tokenId) public view returns (string memory) {
        string memory uri = "";
    
        for(uint256 i = 0; i < 64-getNumberLength(tokenId) ;i++){
            uri = string(abi.encodePacked(uri, "0"));
        }

        return string(
            abi.encodePacked(baseURI, uri, Strings.toString(tokenId), ".json")
            );
    }

    function getNumberLength(uint256 num) public pure returns (uint256){
        uint256 length = 0;
        while (num != 0) { num >>= 8; length++; }
        return length;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    function flipSaleStatus() public onlyOwner {
        isSaleActive = !isSaleActive;
    }
     
    function setPrice(uint256 _newPrice) public onlyOwner() {
        price = _newPrice;
    }

    function getPrice() public view returns (uint256){
        return price;
    }

    function withdraw() public payable onlyOwner {
       payable(owner()).transfer(address(this).balance);
    }
}