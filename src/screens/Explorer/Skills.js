import React from "react";

const Skills = () => {

    const firstSkills = [
        'firstSkill.png',
        'secondSkill.png',
        'thirdSkill.png',
        'fourthSkill.png',
        'fifthSkill.png',
        'sixthSkill.png',
        'seventhSkill.png',
    ]
    const secondSkills = [
        'firstSkill.png',
        'secondSkill.png',
        'thirdSkill.png',
        'fourthSkill.png',
        'fifthSkill.png',
        'sixthSkill.png',
    ]
    const thirdSkills = [
        'firstSkill.png',
        'secondSkill.png',
        'thirdSkill.png',
        'fourthSkill.png',
        'fifthSkill.png',
        'sixthSkill.png',
        'seventhSkill.png',
    ]

  return (
    <div className="row w-100 px-3 px-lg-5">
      <div className="col-3 d-flex justify-content center align-items-center">
        <div className="d-flex flex-column gap-3">
          <h3 className="skills-title font-organetto">
            Class skills and powers
          </h3>
          <p className="skills-desc font-poppins">
            Warriors and Sorcerers have access to incredible skills and a talent
            tree that can be upgraded into powerful weapons of destruction.
          </p>
        </div>
      </div>
      <div className="col-9 d-flex flex-column justify-content-center align-items-end">
       <div className="d-flex flex-column justify-content-center align-items-center gap-3 px-0">
       <div className="first-skill-group">
            {firstSkills.map((skill) => (
                <img src={require(`../../assets/explorerAssets/firstSkillset/${skill}`)} alt="" />
            ))}
        </div>
        <div className="second-skill-group">
            {secondSkills.map((skill) => (
                <img src={require(`../../assets/explorerAssets/secondSkillset/${skill}`)} alt="" />
            ))}
        </div>
        <div className="third-skill-group">
            {thirdSkills.map((skill) => (
                <img src={require(`../../assets/explorerAssets/thirdSkillset/${skill}`)} alt="" />
            ))}
        </div>
       </div>
      </div>
    </div>
  );
};

export default Skills;
