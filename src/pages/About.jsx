import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <>
      <div className="text-white flex flex-col items-center">
        {/* section 1 */}

        <section className=" bg-[#161D29] w-full flex flex-col items-center gap-4 h-[660px]">
          <h1 className="text-2xl font-bold mt-10">* About us *</h1>
          <div className="flex flex-col items-center gap-4 relative ">
            <header className="w-[913px] space-y-3 text-richblack-25 text-3xl font-bold text-center">
              Driving Innovation in Online Education for a <br />
              <HighlightText text={"Brighter Future"} />
              <p className="text-[18px] text-richblack-500">
                Studynotion is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                and nurturing a vibrant learning community.
              </p>
            </header>
            <div className="flex gap-x-3 items-center justify-center mx-auto absolute top-[300px]">
              <img src={BannerImage1} />
              <img src={BannerImage2} />
              <img src={BannerImage3} />
            </div>
          </div>
        </section>

        {/* section 2 */}
        <div className="pt-24"></div>
        <section className="flex flex-col items-center gap-4 w-11/12 max-w-maxContent">
          <div>
            <Quote />
          </div>
        </section>

        {/* section 3 */}
        <div className="pt-24"></div>

        <section>
          <div className="flex flex-col items-center gap-8">
            {/* foudning story wala div */}
            <div className="flex w-11/12 max-w-maxContent items-center gap-3">
              {/* founding story left box */}
              <div className="w-[50%] flex flex-col p-3 gap-5 text-richblack-300">
                <h1 className="font-bold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text text-3xl">
                  Our Founding Story
                </h1>

                <p className="text-justify text-[18px] w-[90%]">
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>

                <p className="text-justify text-[18px] w-[90%]">
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>
              {/* foudning story right box */}
              <div className="w-[50%]">
                <img src={FoundingStory} />
              </div>
            </div>

            {/* vision and mission wala parent div */}
            <div className="flex w-11/12 max-w-maxContent items-center gap-3">
              {/* left box */}
              <div className="w-[50%] flex flex-col p-3 gap-5 text-richblack-300">
                <h1 className="font-bold bg-gradient-to-r from-[#E65C00] via-[#F9D423] to-[#A6FFCB] text-transparent bg-clip-text text-3xl">
                  Our Vision
                </h1>
                <p>
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.
                </p>
              </div>

              {/* right box */}
              <div className="w-[50%] flex flex-col p-3 gap-5 text-richblack-300">
                <h1 className="font-bold bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-3xl">
                  Our Mission
                </h1>
                <p>
                  Our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* section 4 */}
        <div className="pt-12"></div>
        <StatsComponent />
        <div className="pt-12"></div>

        {/* section 5 */}
        <section className="mx-auto flex flex-col items-center justify-between gap-5 w-11/12 max-w-maxContent">
          <LearningGrid />
          <ContactFormSection />
        </section>
        <div className="pt-12"></div>

        <section className="flex flex-col">
          <div>
            <h1>Reviews from other learners</h1>
            {/* <ReviewSlider /> */}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
