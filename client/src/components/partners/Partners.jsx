import React from 'react'
import "./partners.scss"


const skills = [
    {
      id:1,
      img: "/amazon.svg",
    },
    {
      id:2,
      img: "/facebook.svg",
    },
    {
      id:3,
      img: "/google.svg",
    },
    {
      id:4,
      img:"/microsoft.svg",
    },
    {
      id:5,
      img:"/spotify.svg",
    },
  ]

const Partners = () => {

    const repeatedSkills = [skills, ...skills, ...skills, ...skills, ...skills, ...skills];

    return (
      <div className='partners' id='skills'>
        <h2>Nos partenaires</h2>
        <div className="partnersCardContainer">
          <div className="partnersAnimation">
            {repeatedSkills.map((item, id) => (
              <div key={id} className="partnersCard">
                <img src={item.img} alt={item.skill} className="partnersIcon" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

export default Partners