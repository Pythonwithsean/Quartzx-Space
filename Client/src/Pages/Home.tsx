import Header from "../Components/Header";
import "../Styles/Home.css";
import Welcome from "../Components/Welcome";
function Home(): JSX.Element {
  return (
    <main>
      <Header />
      <Welcome />
    </main>
  );
}

export default Home;
