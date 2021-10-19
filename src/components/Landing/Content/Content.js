import React from "react";
import "./Content.css";

import headerGraphics from "./../../../assets/svgs/header-graphics.svg";

const Content = () => {
  return (
    <>
      <div className="content-container">
        <div className="content-pair">
          <div className="content-pair-text">
            <div className="content-pair-heading">
              <span className="content-pair-word">Projects</span>: Have a look
              at our exciting projects
            </div>
            <div className="content-pair-paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              aperiam aliquam aspernatur impedit soluta, expedita vitae eveniet
              aliquid quidem, tempore quas ad quae illo sunt quisquam sed
              voluptate laborum quo esse labore at maxime iusto. Nesciunt beatae
              pariatur vero eveniet maiores obcaecati aut amet eligendi
              consequatur alias mollitia ea dicta vel ipsam, iste qui. A iure
              rerum odio et? Earum error facilis aperiam, quas veniam cum
              soluta. Doloremque repellendus minima magnam nemo mollitia illo
              facere commodi dicta vero quisquam? Qui iste excepturi quas, modi
              corrupti nobis assumenda possimus placeat explicabo deleniti
              facilis veniam optio illum nihil nisi dolorum sit aperiam.
            </div>
          </div>
          <div className="content-pair-graphics">
            <img src={headerGraphics} alt="CONTENT GRAPHICS 1" />
          </div>
        </div>

        <div className="content-pair">
        <div className="content-pair-text content-mobile">
            <div className="content-pair-heading">
              <span className="content-pair-word">Blogs</span>: Have a look
              at our exciting projects
            </div>
            <div className="content-pair-paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              aperiam aliquam aspernatur impedit soluta, expedita vitae eveniet
              aliquid quidem, tempore quas ad quae illo sunt quisquam sed
              voluptate laborum quo esse labore at maxime iusto. Nesciunt beatae
              pariatur vero eveniet maiores obcaecati aut amet eligendi
              consequatur alias mollitia ea dicta vel ipsam, iste qui. A iure
              rerum odio et? Earum error facilis aperiam, quas veniam cum
              soluta. Doloremque repellendus minima magnam nemo mollitia illo
              facere commodi dicta vero quisquam? Qui iste excepturi quas, modi
              corrupti nobis assumenda possimus placeat explicabo deleniti
              facilis veniam optio illum nihil nisi dolorum sit aperiam.
            </div>
          </div>
          <div className="content-pair-graphics">
            <img src={headerGraphics} alt="CONTENT GRAPHICS 1" />
          </div>
          <div className="content-pair-text content-nonmobile">
            <div className="content-pair-heading content-nonmobile">
              <span className="content-pair-word">Projects</span>: Have a look
              at our exciting projects
            </div>
            <div className="content-pair-paragraph content-mobile">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              aperiam aliquam aspernatur impedit soluta, expedita vitae eveniet
              aliquid quidem, tempore quas ad quae illo sunt quisquam sed
              voluptate laborum quo esse labore at maxime iusto. Nesciunt beatae
              pariatur vero eveniet maiores obcaecati aut amet eligendi
              consequatur alias mollitia ea dicta vel ipsam, iste qui. A iure
              rerum odio et? Earum error facilis aperiam, quas veniam cum
              soluta. Doloremque repellendus minima magnam nemo mollitia illo
              facere commodi dicta vero quisquam? Qui iste excepturi quas, modi
              corrupti nobis assumenda possimus placeat explicabo deleniti
              facilis veniam optio illum nihil nisi dolorum sit aperiam.
            </div>
          </div>
        </div>

        <div className="content-pair">
          <div className="content-pair-text">
            <div className="content-pair-heading">
              <span className="content-pair-word">Projects</span>: Have a look
              at our exciting projects
            </div>
            <div className="content-pair-paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              aperiam aliquam aspernatur impedit soluta, expedita vitae eveniet
              aliquid quidem, tempore quas ad quae illo sunt quisquam sed
              voluptate laborum quo esse labore at maxime iusto. Nesciunt beatae
              pariatur vero eveniet maiores obcaecati aut amet eligendi
              consequatur alias mollitia ea dicta vel ipsam, iste qui. A iure
              rerum odio et? Earum error facilis aperiam, quas veniam cum
              soluta. Doloremque repellendus minima magnam nemo mollitia illo
              facere commodi dicta vero quisquam? Qui iste excepturi quas, modi
              corrupti nobis assumenda possimus placeat explicabo deleniti
              facilis veniam optio illum nihil nisi dolorum sit aperiam.
            </div>
          </div>
          <div className="content-pair-graphics">
            <img src={headerGraphics} alt="CONTENT GRAPHICS 1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
