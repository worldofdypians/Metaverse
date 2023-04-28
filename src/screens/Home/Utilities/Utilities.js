import React from "react";
import './_utilities.scss'

const Utilities = () => {
  const utilities = [
    {
      title: "DYP Token",
      image: "dyp.svg",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere possimus qui dolorum similique praesentium fugiat magnam obcaecati deleniti accusantium, voluptatibus iure cupiditate voluptatem numquam, sint provident, impedit repudiandae deserunt esse.",
    },
    {
      title: "iDYP Token",
      image: "idyp.svg",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere possimus qui dolorum similique praesentium fugiat magnam obcaecati deleniti accusantium, voluptatibus iure cupiditate voluptatem numquam, sint provident, impedit repudiandae deserunt esse.",
    },
    {
      title: "CAWS",
      image: "caws.png",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere possimus qui dolorum similique praesentium fugiat magnam obcaecati deleniti accusantium, voluptatibus iure cupiditate voluptatem numquam, sint provident, impedit repudiandae deserunt esse.",
    },
    {
      title: "Genesis Land",
      image: "genesis.png",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere possimus qui dolorum similique praesentium fugiat magnam obcaecati deleniti accusantium, voluptatibus iure cupiditate voluptatem numquam, sint provident, impedit repudiandae deserunt esse.",
    },
  ];

  return (
    <div className="px-3 px-lg-5" id="utilities">
      <div className="w-100">
        <h2 className="font-organetto explorer-grid-title px-0 w-50">
          Product <mark className="font-organetto explore-tag">Utilities</mark>
        </h2>
      </div>
      <div className="utilities-grid">
        {utilities.map((item, index) => (
            <div className="utility-card flex-column d-flex align-items-center justify-content-center p-4">
                <div className="utility-first d-flex align-items-center justify-content-center gap-2 flex-column">
                    <img src={require(`./assets/${item.image}`)} style={{width: '50px', height: '50px'}} alt="" />
                    <h6 className="utility-title">{item.title}</h6>
                </div>
                <div className="utility-desc-div">
                    <p className="utility-desc">
                        {item.desc}
                    </p>
                </div>
            </div>
        ) )}
      </div>
    </div>
  );
};

export default Utilities;
