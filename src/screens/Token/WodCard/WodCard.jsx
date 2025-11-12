import "./_wodcard.scss";

const WodCard = () => {
  return (
    <div className="wod-card-wrapper px-3 px-lg-5 position-relative d-flex flex-column align-items-center justify-content-start justify-content-lg-center mt-4">
      <img
        src="https://cdn.worldofdypians.com/wod/wod-cards.webp"
        alt=""
        className="wod-cards-img d-none d-lg-block"
      />
      <div className="container-fluid py-4 px-0 d-flex justify-content-center">
        <div className="custom-container w-100 d-flex flex-column gap-4 ">
          <span className="wod-card-title col-xl-4 col-lg-5 col-md-9">
            POWER IN EVERY STORE FOR EVERY PLAYER
          </span>
          <span className="text-left mb-0 token-utility-desc-header col-xl-4 col-lg-5 col-md-8">
            Use your World of Dypians Card in stores around the globe, turning
            your in-game progress into real-world benefits.
          </span>
          <a
            href="https://newshare.bwb.online/en/referralLanding?inviteCode=LwySvv&utm_source=newInviteRebate&type=card"
            target="_blank"
            rel="noreferrer"
            className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2"
          >
            Get your card
          </a>
        </div>
      </div>
    </div>
  );
};

export default WodCard;
