import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Icon, { HomeOutlined } from '@ant-design/icons';
import MintNFT from "components/MintNFT";
import MintCryptoDevs from "components/MintCryptoDevs";
import BurnCryptoDevs from "components/BurnCryptoDevs";
import RarityCryptoDevs from "components/RarityCryptoDevs";
import Chains from "components/Chains";
import QuickStart from "components/QuickStart";
import NFTBalance from "components/NFTBalance";
import NFTTokenIds from "components/NFTTokenIds";
import { Menu, Layout } from "antd";
import SearchCollections from "components/SearchCollections";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import NFTMarketTransactions from "components/NFTMarketTransactions";
const { Header, Footer } = Layout;
const { SubMenu } = Menu

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();


  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <SearchCollections setInputValue={setInputValue} />
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "14px",
              fontWeight: "500",
              marginLeft: "5px",
              width: "100%",
              justifyContent: "center",
            }}
            defaultSelectedKeys={["about"]}
          >
            <Menu.Item key="about">
              <NavLink to="/about"> About </NavLink>
            </Menu.Item>
            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")} >
              <NavLink to="/NFTMarketPlace">🛒 Explore Market</NavLink>
            </Menu.Item>
            <Menu.Item key="candyMint">
              <NavLink to="/candyNft">🍬 Candy NFT</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="transactions">
              <NavLink to="/Transactions">📑 Your Transactions</NavLink>
            </Menu.Item>
            <Menu.Item key="nft">
              <NavLink to="/nftBalance">🖼 Your Collection</NavLink>
            </Menu.Item> */}
            <SubMenu key="cryptoDevs" title="💻 CryptoDevs">
              <Menu.Item key="mintCryptoDevs">
                <NavLink to="/mintCryptoDevs">Mint CryptoDevs</NavLink>
              </Menu.Item>
              <Menu.Item key="burnCryptoDevs">
                <NavLink to="/burnCryptoDevs">Burn CryptoDevs</NavLink>
              </Menu.Item>
              <Menu.Item key="rarityCryptoDevs">
                <NavLink to="/rarityCryptoDevs">Rarity</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="yourProfile" title="🤘 Your Profile">
              <Menu.Item key="transactions">
                <NavLink to="/Transactions">📑 Your Transactions</NavLink>
              </Menu.Item>
              <Menu.Item key="nft">
                <NavLink to="/nftBalance">🖼 Your Collection</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/about">
              <QuickStart />
            </Route>
            <Route path="/candyNft">
              <MintNFT />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/NFTMarketPlace">
              <NFTTokenIds inputValue={inputValue} setInputValue={setInputValue} />
            </Route>
            <Route path="/Transactions">
              <NFTMarketTransactions />
            </Route>
            <Route path="/mintCryptoDevs">
              <MintCryptoDevs />
            </Route>
            <Route path="/burnCryptoDevs">
              <BurnCryptoDevs />
            </Route>
            <Route path="/rarityCryptoDevs">
              <RarityCryptoDevs />
            </Route>
          </Switch>
          <Redirect to="/about" />
        </div>
      </Router>
      {/* <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          ⭐️ Please star this{" "}
          <a
            href="https://github.com/ethereum-boilerplate/ethereum-boilerplate/"
            target="_blank"
            rel="noopener noreferrer"
          >
            boilerplate
          </a>
          , every star makes us very happy!
        </Text>

        <Text style={{ display: "block" }}>
          🙋 You have questions? Ask them on the {""}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://forum.moralis.io/t/ethereum-boilerplate-questions/3951/29"
          >
            Moralis forum
          </a>
        </Text>

        <Text style={{ display: "block" }}>
          📖 Read more about{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://moralis.io?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplat"
          >
            Moralis
          </a>
        </Text>
      </Footer> */}
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex"}}>
    <svg width="60" height="50" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M102 269.409H163.176L187.646 150.048L197.434 159.792C199.881 162.228 204.775 162.228 207.222 159.792L236.586 130.561C239.033 128.125 239.033 120.817 236.586 118.381C235.363 117.163 224.352 102.549 212.424 86.7165C200.494 70.8827 187.646 53.829 182.752 47.7392C172.964 35.5597 148.493 38.8077 143.599 50.1751C138.705 61.5425 102 269.409 102 269.409Z" fill="black" />
      <path fillRule="evenodd" clipRule="evenodd" d="M397.422 269.409H336.246L311.776 150.048L301.988 159.792C299.541 162.228 294.647 162.228 292.2 159.792L262.836 130.561C260.388 128.125 260.388 120.817 262.836 118.381C264.059 117.163 275.069 102.549 286.998 86.7165C298.927 70.8827 311.776 53.829 316.67 47.7392C326.458 35.5597 350.928 38.8077 355.822 50.1751C360.717 61.5425 397.422 269.409 397.422 269.409Z" fill="black" />
      <path d="M217.867 183.092C214.044 179.287 214.044 173.117 217.867 169.312L242.736 144.556C247.712 139.885 250.743 139.744 256.578 144.556L281.447 169.312C285.27 173.117 285.27 179.287 281.447 183.092L256.578 207.848C252.756 211.653 246.558 211.653 242.736 207.848L217.867 183.092Z" fill="black" />
      <path d="M63.4219 376.818V456.4H89.4505V376.818H114.611V353.335H89.4505V329.417C89.4505 316.589 97.9098 313.762 102.899 313.762C109.406 313.762 113.31 316.806 113.31 316.806C113.31 316.806 115.782 311.244 117.018 308.463C119.036 303.923 123.071 294.845 123.071 294.845L122.56 294.544C120.534 293.403 112.566 289.409 100.296 289.409C83.594 289.409 63.4219 299.411 63.4219 328.113V353.335V376.818Z" fill="black" />
      <path fillRule="evenodd" clipRule="evenodd" d="M120.088 405.25C120.088 374.799 144.184 351.091 174.518 351.091C204.852 351.091 228.948 374.799 228.948 405.25C228.948 435.483 204.852 459.409 174.518 459.409C144.184 459.409 120.088 435.483 120.088 405.25ZM143.948 405.25C143.948 423.127 155.901 438.347 175.264 438.347C194.627 438.347 206.58 423.127 206.58 405.25C206.58 387.372 194.627 372.152 175.264 372.152C155.901 372.152 143.948 387.372 143.948 405.25Z" fill="black" />
      <path d="M248.332 456.4H273.683V292.418H248.332V456.4Z" fill="black" />
      <path d="M296.051 456.401H321.402V354.1H296.051V456.401Z" fill="black" />
      <path d="M291.579 327.772C291.579 337.407 299.176 345.072 308.728 345.072C318.279 345.072 325.877 337.407 325.877 327.772C325.877 318.136 318.279 310.471 308.728 310.471C299.176 310.471 291.579 318.136 291.579 327.772Z" fill="#FF4600" />
      <path fillRule="evenodd" clipRule="evenodd" d="M340.788 405.25C340.788 374.799 364.883 351.091 395.218 351.091C425.552 351.091 449.647 374.799 449.647 405.25C449.647 435.483 425.552 459.409 395.218 459.409C364.883 459.409 340.788 435.483 340.788 405.25ZM364.648 405.25C364.648 423.127 376.601 438.347 395.964 438.347C415.327 438.347 427.28 423.127 427.28 405.25C427.28 387.372 415.327 372.152 395.964 372.152C376.601 372.152 364.648 387.372 364.648 405.25Z" fill="black" />
      <rect x="58.9478" y="343.568" width="56.6664" height="10.5309" fill="white" />
      <rect x="50" y="354.1" width="62.6313" height="22.5663" fill="black" />
    </svg>
  </div>
);

export default App;
