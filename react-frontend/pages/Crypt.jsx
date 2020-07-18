import React from "react";
import CryptForm from "./components/CryptForm.jsx";
import CryptResults from "./components/CryptResults.jsx";

class Crypt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };

  }

  render() {
    const setResults = (cards) => {
      this.setState({cards: cards});
    };

    return (
      <div className="container main-container py-xl-3 px-0 px-xl-2">
        <div className="row mx-0">
          <div className="col-md-12 col-lg-2 col-xl-2 left-col px-1 px-xl-2">
            CARD PREVIEW ON HOVER
          </div>
          <div className="col-md-12 col-lg-7 col-xl-7 center-col px-1 px-xl-2">
            <CryptResults cards={this.state.cards}/>
          </div>

          <div className="col-xs-12 col-lg-3 col-xl-3 right-col px-1 px-xl-2">
            <CryptForm setResults={setResults} />
          </div>
        </div>
      </div>
    )
  }
}

export default Crypt;
