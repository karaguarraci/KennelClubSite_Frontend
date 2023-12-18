import GSDLogo from "../assets/GSDLogo.jpg";

const Home = () => {
  return (
    <div className="home-page">
      <img src={GSDLogo}></img>
      <div className="about-us">
        <h1>About Us</h1>
        <div className="content-container">
          <p>
            Welcome to Heads of the Valleys German Shepherd Dog Club, we are a
            club with the ethic to Advance the breed. The Club was founded in
            March 1985 with the clubhouse and showground being at Royvons
            Kennels & Training Centre in Merthyr Tydfil. Achieving it's CC
            status in 2006 , The late Rob Davies of the Silverleigh Kennels was
            a true embassador of the club, always full of encouragement holding
            regular training and devoting his time to the club, he is greatly
            missed and through his dedication the club is here today and will
            continue to thrive in memory of him. Currently our showground is at
            Tonew Training Centre together with regular training at Pontypridd
            being both an inside & outside venue hosted by breed specialist
            trainers who support, guide & advise members both old & new to help
            get the best out of their dog. Everyone is welcome, please see our
            facebook page for regular updates.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
