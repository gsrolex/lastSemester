import Heading from "../layout/Heading";
import SearchOnePage from "../layout/SearchOnePage";

export default function HomePage() {
  return (
    <>
      <div>
        <Heading className="center" content="Home" size="40px" />
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col-6 "></div>
            <div className="col"></div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col-6 p-3 d-flex justify-content-center ">
              <SearchOnePage />
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </>
  );
}
