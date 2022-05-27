import { Card, Timeline, Typography, Image, Row, Col } from "antd";
import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
    width: "500px",
    margin: "10px"
  },
  banner: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
    width: "1020px",
    margin: "10px"
  },
  timeline: {
    marginBottom: "-45px",
  },
  cryptoDevImage: {
    height: "250px",
    width: "250px",
    borderRadius: "50%",
    border: "solid 4px white",
    margin: "20px",
    marginTop: "0px"
  },
  logo: {
    width: "80%",
    border: "solid 4px white",
    margin: "20px",
    marginTop: "0px",
    flex: "1"
  }
};

export default function QuickStart({ isServerInfo }) {
  const { Moralis } = useMoralis();

  const isInchDex = useMemo(
    () => (Moralis.Plugins?.oneInch ? true : false),
    [Moralis.Plugins?.oneInch]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Card
        style={styles.banner}
        title={<h1 style={styles.title}>About MintFolio</h1>}
      >
        {/* <div style={{display: "flex", flexDirection: "row", alignItems: "center", }}> */}
        <Row justify="space-between" style={{alignItems: "center"}}>
          <Col span={8}>
            <Image
              preview={false}
              src={"https://ethglobal.s3.amazonaws.com/recFEgY5UWANb5eiq/logo.png"}
              alt="MintFolio"
              style={styles.logo}
            />
          </Col>
          <Col span={16}>
            <Text style={styles.text}>
              <Text strong>MintFolio</Text> is a one-stop Dapp for all your NFT needs, Whether you 
               are a dev, artist or a new collector. Our Dapp allows you 
               to mint, burn, check rarity, sell, list, generate ... NFTs. 
               Fork and launch your new NFT collection/project in minutes!
            </Text>
          </Col>
        </Row>
        {/* </div> */}
      </Card>
      <Card
        style={styles.banner}
        title={<h1 style={styles.title}>Launching CryptoDevs 🚀</h1>}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Image
            preview={false}
            src={"https://ipfs.moralis.io:2053/ipfs/QmTNVQaQjCz5JxgYUDrBtcdDAnXhHvvyfhbqHgu63dgWR1/images/0000000000000000000000000000000000000000000000000000000000000002.png"}
            alt="crypto dev image"
            style={styles.cryptoDevImage}
          />
          <Text style={styles.text}>
            <Text strong>CryptoDevs</Text> is a collection of 1000+
            uniquely generated digital collectibles with various attributes
            which can be minted as NFTs on the Polygon blockchain.
            This collection is a tribute for all the Developers out there 💜
          </Text>
          <Text style={styles.text}>
            <Text code>#RoadtoWeb3</Text><Text code>#ETHGlobal</Text><Text code>#CryptoDevs</Text>
          </Text>
          <Text style={styles.text}>
          <Text italic>PROVENANCE HASH : </Text><Text code italic>9566a46ff11d8abfbcb51c6ce360f59739e4e298ac7faba649d046fe6c099ea6</Text>
          </Text>
        </div>
      </Card>


      <div style={{ display: "flex", flexDirection: "row" }}>
        <Card style={styles.card} title={<h1 style={styles.title}>Functionalities </h1>}>
          <Timeline mode="left" style={styles.timeline}>
            <Timeline.Item dot="">
              <Text style={styles.text}>
                A cross-chain marketplace to <Text strong>Search, Buy, List</Text> and <Text strong>Sell</Text> your NFTs
              </Text>
            </Timeline.Item>

            <Timeline.Item dot="">
              <Text style={styles.text}>
                <Text strong>Candy NFT machine </Text> which generates a random NFT on click of a button!
              </Text>
            </Timeline.Item>

            <Timeline.Item dot="">
              <Text style={styles.text}>
                Under <Text strong>Your Profile</Text> you can see all your transactions and actions
              </Text>
            </Timeline.Item>

            <Timeline.Item dot="">
              <Text style={styles.text}>
                <Text strong>Mint - Burn - check Rarity</Text> of NFT Collections
              </Text>
            </Timeline.Item>

            <Timeline.Item dot="">
              <Text style={styles.text}>
                Featuring <Text strong>CryptoDevs</Text> NFTs collection
              </Text>
            </Timeline.Item>
          </Timeline>
        </Card>

        <Card
          style={styles.card}
          title={<h1 style={styles.title}>Technologies</h1>}
        >
          <Timeline mode="left" style={styles.timeline}>
            <Timeline.Item dot="">
              <Text style={styles.text}>
                ⚡ Lightning-fast transactions powered by <Text strong>Polygon</Text> Network.
              </Text>
            </Timeline.Item>
            <Timeline.Item dot="">
              <Text style={styles.text}>
                📦 Storing NFTs artwork and metadata on <Text strong>IPFS</Text>.
              </Text>
            </Timeline.Item>
            <Timeline.Item dot="">
              <Text style={styles.text}>
                🛠 Boilerplate and backend server powered by <Text strong>Moralis</Text>.
              </Text>
            </Timeline.Item>
            <Timeline.Item dot="" style={styles.text}>
              <Text>
                ⛓ Randomness use to generate candy NFT art using <Text strong>Chainlink</Text> VRF
              </Text>
            </Timeline.Item>
          </Timeline>
        </Card>
      </div>

    </div>
  );
}
