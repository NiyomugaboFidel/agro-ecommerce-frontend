/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box } from "@mui/material";
import Person1 from "./Person1.jpg";
import Person2 from "./Person2.jpg";
import PaginationIndicator from "../common/components/PaginationIndicator";
import i18n from "../common/components/LangConfig";
const teamMembersData = [
  {
    name: i18n.t("aboutPage.name1"),
    role: i18n.t("aboutPage.job3"),
    image: Person1,
  },
  {
    name: i18n.t("aboutPage.name2"),
    role: i18n.t("aboutPage.job1"),
    image: Person2,
  },
  {
    name: i18n.t("aboutPage.name4"),
    role: i18n.t("aboutPage.job2"),
    image: Person1,
  },
  {
    name: i18n.t("aboutPage.name3"),
    role: i18n.t("aboutPage.job3"),
    image: Person2,
  },
  {
    name: i18n.t("aboutPage.name2"),
    role: i18n.t("aboutPage.job1"),
    image: Person1,
  },
  {
    name: i18n.t("aboutPage.name1"),
    role: i18n.t("aboutPage.job4"),
    image: Person2,
  },
  {
    name: i18n.t("aboutPage.name3"),
    role: i18n.t("aboutPage.job2"),
    image: Person1,
  },
];

const TeamMember = ({ name, role, image }) => {
  return (
    <Box className="flex gap-4 flex-col dark:text-gray-300">
      <img src={image} alt="image" className="h-[400px]" />
      <Box className="flex md:mx-10  gap-4 items-center md:items-start flex-col ">
        <h2 className="font-bold text-3xl">{name}</h2>
        <p className="text-base">{role}</p>
        <>
          <a href="#">
            <svg
              width="104"
              height="24"
              viewBox="0 0 104 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_246_4771)">
                <path
                  className="fill-transparent dark:stroke-slate-300 stroke-black"
                  d="M12.905 8.84651L12.905 8.84646C12.9194 8.06035 13.2418 7.3113 13.8028 6.76049C14.3639 6.20969 15.1188 5.90116 15.905 5.90129L12.905 8.84651ZM12.905 8.84651L12.877 10.4213M12.905 8.84651L12.877 10.4213M4.75811 7.80857L4.89001 7.91846C6.76679 9.48211 8.71781 10.4182 10.7495 10.6952C10.7495 10.6952 10.7495 10.6952 10.7495 10.6952L12.3104 10.9072L4.75811 7.80857ZM4.75811 7.80857L4.72759 7.97751M4.75811 7.80857L4.72759 7.97751M4.72759 7.97751C4.42576 9.64819 4.5683 11.0709 5.1479 12.3018C5.72718 13.532 6.73827 14.5605 8.15577 15.4519L8.15579 15.452M4.72759 7.97751L8.15579 15.452M8.15579 15.452L9.90279 16.55L9.954 16.4685M8.15579 15.452L9.954 16.4685M9.954 16.4685L9.90279 16.55C9.97196 16.5934 10.0294 16.6532 10.0702 16.724C10.1109 16.7948 10.1337 16.8745 10.1365 16.9562C10.1392 17.0378 10.122 17.1189 10.0862 17.1924C10.0504 17.2658 9.99716 17.3294 9.93112 17.3775L9.93101 17.3775M9.954 16.4685L9.93101 17.3775M9.93101 17.3775L8.33901 18.5405L8.11542 18.7039M9.93101 17.3775L8.11542 18.7039M8.11542 18.7039L8.39178 18.7211M8.11542 18.7039L8.39178 18.7211M8.39178 18.7211C9.3449 18.7805 10.2529 18.7385 11.0095 18.5884L11.0096 18.5884M8.39178 18.7211L11.0096 18.5884M11.0096 18.5884C13.3886 18.1134 15.3745 16.9794 16.7652 15.2211M11.0096 18.5884L16.7652 15.2211M12.877 10.4213C12.8757 10.4918 12.8594 10.5612 12.8293 10.625C12.7993 10.6887 12.7561 10.7454 12.7026 10.7912C12.649 10.8371 12.5864 10.8712 12.5188 10.8911C12.4513 10.9111 12.3803 10.9166 12.3105 10.9072L12.877 10.4213ZM16.7652 15.2211C18.1557 13.463 18.945 11.0883 18.945 8.14229M16.7652 15.2211L18.945 8.14229M18.945 8.14229C18.945 7.99668 18.8714 7.78474 18.744 7.55722M18.945 8.14229L18.744 7.55722M18.744 7.55722C18.6142 7.32559 18.4215 7.06508 18.1673 6.82049M18.744 7.55722L18.1673 6.82049M18.1673 6.82049C17.6587 6.33088 16.8999 5.90129 15.905 5.90129L18.1673 6.82049ZM20.4978 5.53842C20.8818 5.48388 21.3285 5.34345 21.916 5.01105C21.6101 6.49526 21.4321 7.16764 20.7642 8.08336L20.745 8.10969V8.14229C20.745 11.9415 19.578 14.7567 17.8258 16.7397C16.0726 18.7238 13.7277 19.8813 11.3624 20.3532C9.74529 20.6759 7.7544 20.5728 5.99643 20.2106C5.11813 20.0296 4.30077 19.7846 3.61983 19.4974C3.03727 19.2517 2.56009 18.9775 2.22956 18.6904C2.66065 18.6482 3.4114 18.5535 4.24366 18.3598C5.24355 18.1272 6.37173 17.7494 7.20306 17.141L7.31918 17.056L7.19904 16.9768C7.15724 16.9492 7.11178 16.9196 7.06301 16.8879C6.30477 16.3938 4.74648 15.3786 3.73155 13.5166C2.66714 11.5637 2.19257 8.66295 3.91362 4.42592C5.57889 6.34347 7.2726 7.66001 8.99504 8.3668L8.99505 8.36681C9.57662 8.60536 9.94255 8.72373 10.2318 8.79141C10.4509 8.84265 10.6261 8.86463 10.8117 8.88794C10.8703 8.89529 10.93 8.90278 10.9924 8.91135L11.2872 8.95189L11.1059 8.77077C11.131 7.8414 11.4254 6.93895 11.9539 6.17331C12.4904 5.39606 13.2442 4.79434 14.1211 4.4435C14.9979 4.09265 15.9588 4.00828 16.8833 4.20093C17.8079 4.39359 18.6551 4.85471 19.3189 5.52657L19.3485 5.55658L19.3907 5.55628C19.4934 5.55556 19.5972 5.55908 19.7036 5.56269C19.9483 5.57098 20.2068 5.57974 20.4978 5.53842Z"
                  strokeWidth="0.5"
                />
              </g>
              <path
                className="stroke-black dark:stroke-gray-300"
                d="M57 3H47C45.9391 3 44.9217 3.42143 44.1716 4.17157C43.4214 4.92172 43 5.93913 43 7V17C43 18.0609 43.4214 19.0783 44.1716 19.8284C44.9217 20.5786 45.9391 21 47 21H57C58.0609 21 59.0783 20.5786 59.8284 19.8284C60.5786 19.0783 61 18.0609 61 17V7C61 5.93913 60.5786 4.92172 59.8284 4.17157C59.0783 3.42143 58.0609 3 57 3Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                className="stroke-black dark:stroke-gray-300"
                d="M52 16C53.0609 16 54.0783 15.5786 54.8284 14.8284C55.5786 14.0783 56 13.0609 56 12C56 10.9391 55.5786 9.92172 54.8284 9.17157C54.0783 8.42143 53.0609 8 52 8C50.9391 8 49.9217 8.42143 49.1716 9.17157C48.4214 9.92172 48 10.9391 48 12C48 13.0609 48.4214 14.0783 49.1716 14.8284C49.9217 15.5786 50.9391 16 52 16V16Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                className="stroke-black dark:stroke-gray-300"
                d="M57.5 7.5C57.7652 7.5 58.0196 7.39464 58.2071 7.20711C58.3946 7.01957 58.5 6.76522 58.5 6.5C58.5 6.23478 58.3946 5.98043 58.2071 5.79289C58.0196 5.60536 57.7652 5.5 57.5 5.5C57.2348 5.5 56.9804 5.60536 56.7929 5.79289C56.6054 5.98043 56.5 6.23478 56.5 6.5C56.5 6.76522 56.6054 7.01957 56.7929 7.20711C56.9804 7.39464 57.2348 7.5 57.5 7.5Z"
                fill="black"
              />
              <path
                className="stroke-black dark:stroke-gray-300"
                d="M91.5 9.05C92.417 8.113 93.611 7.5 95 7.5C96.4587 7.5 97.8576 8.07946 98.8891 9.11091C99.9205 10.1424 100.5 11.5413 100.5 13V20.5H98.5V13C98.5 12.0717 98.1313 11.1815 97.4749 10.5251C96.8185 9.86875 95.9283 9.5 95 9.5C94.0717 9.5 93.1815 9.86875 92.5251 10.5251C91.8687 11.1815 91.5 12.0717 91.5 13V20.5H89.5V8H91.5V9.05ZM84.5 6C84.1022 6 83.7206 5.84196 83.4393 5.56066C83.158 5.27936 83 4.89782 83 4.5C83 4.10218 83.158 3.72064 83.4393 3.43934C83.7206 3.15804 84.1022 3 84.5 3C84.8978 3 85.2794 3.15804 85.5607 3.43934C85.842 3.72064 86 4.10218 86 4.5C86 4.89782 85.842 5.27936 85.5607 5.56066C85.2794 5.84196 84.8978 6 84.5 6ZM83.5 8H85.5V20.5H83.5V8Z"
                fill="black"
              />
              <defs>
                <clipPath id="clip0_246_4771">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </>
      </Box>
    </Box>
  );
};

const TeamMembers = () => {
  const [startIndex, setStartIndex] = useState(0);

  return (
    <div>
      <div className=" md:mx-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {teamMembersData
          .slice(startIndex, startIndex + 3)
          .map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
      </div>

      <div className="mx-8 md:mx-32 mt-8">
        <PaginationIndicator
          activeIndex={startIndex}
          onClick={setStartIndex}
          data={teamMembersData}
        />
      </div>
    </div>
  );
};

export default TeamMembers;
