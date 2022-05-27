import NativeBalance from "./NativeBalance";
import Address from "./Address/Address";
import Blockie from "./Blockie";
import { Card, Button, Modal, Tooltip, Image, Alert, InputNumber, Badge, Spin, Divider, } from "antd";
import { useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { Steps } from 'antd';
import { useNFTTokenIds } from "hooks/useNFTTokenIds";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";
const { Meta } = Card;



const styles = {
    title: {
        fontSize: "30px",
        fontWeight: "600",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    card: {
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "1rem",
        width: "450px",
        fontSize: "12px",
        fontWeight: "500",
    },

    steps_action: {
        marginTop: "24px",
    },

    NFTs: {
        display: "flex",
        flexWrap: "wrap",
        WebkitBoxPack: "start",
        justifyContent: "flex-start",
        margin: "0 auto",
        maxWidth: "1000px",
        gap: "10px",
        marginTop: "20px",
    },
    banner: {
        display: "flex",
        // justifyContent: "space-around",
        // alignItems: "center",
        margin: "0 auto",
        // width: "600px",
        borderRadius: "10px",
        // height: "150px",
        // marginBottom: "20px",
        // paddingBottom: "20px",
        // borderBottom: "solid 1px #e3e3e3",
        // flexDirection: "column",
    },
    logo: {
        height: "500px",
        width: "500px",
        // borderRadius: "50%",
        // positon: "relative",
        // marginTop: "-80px",
        border: "solid 4px white",
    },
    text: {
        color: "#041836",
        fontSize: "27px",
        fontWeight: "bold",
        textAlign: "center"
    },
};

function RarityCryptoDevs() {
    const fallbackImg =
        "data:image/png;base64,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";
    const contractAddress = "0x020783C43e25c5171A6842469400246f6373FfDD";
    const contractABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CRYPTODEVS_PROVENANCE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"TokenAlive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"TokenToOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"formatTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"getNumberLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_provenanceHash","type":"string"}],"name":"setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]';
    const [isPending, setIsPending] = useState(false);
    const contractProcessor = useWeb3ExecuteFunction();
    const contractABIJson = JSON.parse(contractABI);
    const createItemFunction = "mint";
    const { Step } = Steps;
    const [status, setStatus] = useState("wait");
    const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(contractAddress);
    const { chainId, walletAddress } = useMoralisDapp();
    const [inputTokenValue, setInputTokenValue] = useState(1);
    const [rarityMetaData, setRarityMetadata] = useState();
    // console.log(walletAddress, fetchSuccess, totalNFTs);
    // console.log(NFTTokenIds);

    const [token, setToken] = useState();
    const [visibility, setVisibility] = useState(false);
    const [NFTBalances, setNFTBalances] = useState();
    const [collection, setCollection] = useState();
    const [nft, setNft] = useState();

    const handleSelectToken = (num) => {
        let selectedNFT = rarityMetaData[num];
        // selectedNFT = selectedNFT.Attributes;
        selectedNFT.rank = num + 1;
        console.log(selectedNFT);
        setNft(selectedNFT);
        setVisibility(true);
    };


    async function generate() {
        // console.log(NFTTokenIds);
        let metadata = NFTTokenIds.map((e) => JSON.parse(JSON.stringify(e.metadata)).attributes);
        // console.log(metadata);
        const tally = { TraitCount: {} };
        console.log(visibility);

        for (let j = 0; j < metadata.length; j++) {
            let nftTraits = metadata[j].map((e) => e.trait_type);
            let nftValues = metadata[j].map((e) => e.value);

            let numOfTraits = nftTraits.length;

            if (tally.TraitCount[numOfTraits]) {
                tally.TraitCount[numOfTraits]++;
            } else {
                tally.TraitCount[numOfTraits] = 1;
            }

            for (let i = 0; i < nftTraits.length; i++) {
                let current = nftTraits[i];
                if (tally[current]) {
                    tally[current].occurences++;
                } else {
                    tally[current] = { occurences: 1 };
                }

                let currentValue = nftValues[i];
                if (tally[current][currentValue]) {
                    tally[current][currentValue]++;
                } else {
                    tally[current][currentValue] = 1;
                }
            }
        }

        const collectionAttributes = Object.keys(tally);
        let nftArr = [];
        for (let j = 0; j < metadata.length; j++) {
            let current = metadata[j];
            let totalRarity = 0;
            for (let i = 0; i < current.length; i++) {
                let rarityScore =
                    1 / (tally[current[i].trait_type][current[i].value] / totalNFTs);
                current[i].rarityScore = rarityScore;
                totalRarity += rarityScore;
            }

            let rarityScoreNumTraits =
                8 * (1 / (tally.TraitCount[Object.keys(current).length] / totalNFTs));
            current.push({
                trait_type: "TraitCount",
                value: Object.keys(current).length,
                rarityScore: rarityScoreNumTraits,
            });
            totalRarity += rarityScoreNumTraits;

            if (current.length < collectionAttributes.length) {
                let nftAttributes = current.map((e) => e.trait_type);
                let absent = collectionAttributes.filter(
                    (e) => !nftAttributes.includes(e)
                );

                absent.forEach((type) => {
                    let rarityScoreNull =
                        1 / ((totalNFTs - tally[type].occurences) / totalNFTs);
                    current.push({
                        trait_type: type,
                        value: null,
                        rarityScore: rarityScoreNull,
                    });
                    totalRarity += rarityScoreNull;
                });
            }

            nftArr.push({
                Attributes: current,
                Rarity: totalRarity,
                token_id: NFTTokenIds[j].token_id,
                image: NFTTokenIds[j].image,
            });
        }

        nftArr.sort((a, b) => b.Rarity - a.Rarity);
        // console.log(nftArr);
        setRarityMetadata(nftArr);
        setNFTBalances(nftArr);
        console.log(visibility)
    }


    function onChange(rank) {
        // setInputTokenValue(rank);

        if (rank > 0 && rank <= totalNFTs) {
            handleSelectToken(rank - 1);
        }
    }

    function succList() {
        let secondsToGo = 5;
        const modal = Modal.success({
            title: "Success!",
            content: `Your NFT is minted, you can look it in your collections`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    function failList() {
        let secondsToGo = 5;
        const modal = Modal.error({
            title: "Error!",
            content: `There was a problem minting your NFT`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
        setStatus("wait");
    }

    async function mint() {
        setIsPending(true);
        setStatus("process")
        const p = 2.5 * ("1e" + 16);  // 0.025 matic
        const ops = {
            contractAddress: contractAddress,
            functionName: createItemFunction,
            abi: contractABIJson,
            params: {},
            msgValue: p
        };

        await contractProcessor.fetch({
            params: ops,
            onSuccess: () => {
                console.log("success");
                setIsPending(false);
                succList();
                setStatus("finish")
            },
            onError: (error) => {
                setIsPending(false);
                failList();
            },
        });
    }

    return ( // starting div
        <div>
            <div>

                {/* {contractABIJson.noContractDeployed && (
                    <>
                        <Alert
                            message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
                            type="error"
                        />
                        <div style={{ marginBottom: "10px" }}></div>
                    </>
                )} */}
                {totalNFTs !== undefined && (
                    <>
                        {!fetchSuccess && (
                            <>
                                <Alert
                                    message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
                                    type="warning"
                                />
                                <div style={{ marginBottom: "10px" }}></div>
                            </>
                        )}

                        {visibility && (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        // alignItems: "center",
                                        marginBottom: "30px",
                                        width: "80vw",
                                    }}
                                >
                                    <Badge.Ribbon
                                        text={`Rank #${nft.rank}`}
                                        style={{ fontSize: "18px" }}
                                    >
                                        <Image
                                            style={styles.logo}
                                            preview={false}
                                            src={nft.image}
                                            loading="lazy"
                                            placeholder={
                                                <div
                                                    style={{
                                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                        borderRadius: "18px",
                                                    }}
                                                >
                                                    <Spin
                                                        size="large"
                                                        style={{
                                                            margin: "auto",
                                                            padding: "250px 0",
                                                            width: "640px",
                                                            height: "640px",
                                                        }}
                                                    />
                                                </div>
                                            }
                                            fallback={fallbackImg}
                                            alt=""
                                        />
                                        {/* <InputNumber
                            min={1}
                            max={totalNFTs}
                            defaultValue={1}
                            onChange={onChange}
                            style={{ width: "100%", marginTop: "0px", marginBottom: "20px" }}
                        /> */}
                                    </Badge.Ribbon>
                                    <Card
                                        // title={`${NFTTokenIds[0]?.name} - Rank #${nft.rank}`}
                                        // bordered={false}
                                        style={styles.card}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: "#91d5ff",
                                                // height: "50px",
                                                borderRadius: "10px",
                                                marginBottom: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Rarity Score {nft.Rarity.toFixed(1)}
                                            {/* <div
                                                style={{
                                                    backgroundColor: "white",
                                                    borderRadius: "8px",
                                                    width: "98%",
                                                    margin: "auto",
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                    fontSize: "20px",
                                                    color: "green",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                {nft.Rarity.toFixed(1)}
                                            </div> */}
                                        </div>
                                        {nft.Attributes.map((e) => {
                                            return (
                                                <>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <span style={{ color: "gray" }}>{e.trait_type}</span>
                                                        <span
                                                            style={{ color: "green", paddingRight: "4%" }}
                                                        >{`+${e.rarityScore.toFixed(1)}`}</span>
                                                    </div>
                                                    <Alert
                                                        style={{
                                                            padding: "2px 2px 2px 12px",
                                                            width: "98%",
                                                            margin: "0px auto 5px",
                                                            fontSize: "14px",
                                                        }}
                                                        message={e.value ? e.value : "<null>"}
                                                        type="info"
                                                        action={
                                                            <Button
                                                                size="small"
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "end",
                                                                    width: "60px",
                                                                }}
                                                            >
                                                                {e.trait_type === "TraitCount" ?
                                                                    ((8 * (totalNFTs / e.rarityScore)).toFixed(0)) :  //Only use this if rarity generator adjusted to 8x traitcount
                                                                    ((totalNFTs / e.rarityScore).toFixed(0))         //Also must be adjusted for collections with +- 10000 NFTs
                                                                }
                                                            </Button>
                                                        }
                                                    />
                                                </>
                                            );
                                        })}
                                    </Card>
                                </div>
                            </>
                        )}


                        {!visibility && (
                            <Button
                                type="primary"
                                size="large"
                                loading={isPending}
                                style={{ width: "200px", marginTop: "0px", marginBottom: "20px"}}
                                onClick={() => generate()}
                            >
                                Check Rarity 🤩
                            </Button>
                        )}


                    </>
                )}
            </div>   {/* Top div which contains rarity and button */}
            <div style={styles.NFTs}>
                {NFTBalances &&
                    NFTBalances.map((nft, index) => {
                        return (
                            <Card
                                onClick={() =>
                                    handleSelectToken(index)
                                }
                                hoverable
                                style={{ width: 190, border: "2px solid #e7eaf3" }}
                                cover={
                                    <Image
                                        preview={false}
                                        src={nft.image}
                                        fallback="data:image/png;base64,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"
                                        alt=""
                                        style={{ height: "190px" }}
                                    />
                                }
                                key={index}
                            >
                                <Meta
                                    title={`Rank #${index + 1}`}
                                    description={`#${nft.token_id}`}
                                />
                            </Card>
                        );
                    })}
            </div>
        </div> // final div
    );
}

export default RarityCryptoDevs;






