import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchResult from "../components/SearchResults/SearchResult/SearchResult";
import SearchResults from "../components/SearchResults/SearchResults";
import Loader from "../components/UI/Loader/Loader";
import useHttp from "../hooks/http";

import Grid from "../containers/Layout/Grid/Grid";
import photo1 from "../../backend/public/pp/document-photo-1693614132360-1.jpeg";
import photo2 from "../../backend/public/pp/document-photo-1693614132378-2.jpeg";
import photo3 from "../../backend/public/pp/document-photo-1693614132380-3.jpeg";
import photo4 from "../../backend/public/pp/document-photo-1693614132386-4.jpeg";
import Input from "../components/UI/Input/Input";
import InputBox from "../components/UI/Form/Input/InputBox/InputBox";
import {
  RiCalendar2Fill,
  RiHashtag,
  RiSearch2Fill,
  RiSearchLine,
  RiUser3Fill,
  RiUserSearchFill,
} from "react-icons/ri";
import Slider from "../components/UI/Slider/Slider";
let typeTimer;
const selectStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      color: "#444",
    };
  },
};

const Home = (props) => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [time, setTime] = useState("");
  const [section, setSection] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [docNum, setDocNum] = useState("");
  const [docDate, setDocDate] = useState("");
  const [forUser, setForUser] = useState("");
  const photos = [photo1, photo2, photo3, photo4];

  // const [start, setStart] = useState(0);
  // const [end, setEnd] = useState(7);
  const start = (curPage - 1) * limit;
  const end = curPage * limit;
  const { sendRequest: getDocsData, isLoading, data, error } = useHttp();
  const [pagesLength, setPagesLength] = useState([]);
  let pagination;

  const options = [
    {
      value: "الصادر",
      label: "الصادر",
    },
    {
      value: "الوارد",
      label: "الوارد",
    },
  ];
  const sectionHandler = (e) => {
    // selectedOpt.map((opt) => setSection([...section, opt.value]));
    setSection(e.target.value);
    console.log(e.target.value);
  };
  const sortHandler = (selectedOpt) => {
    setSort(selectedOpt.value);
  };
  const sortByTimeHandler = (selectedOpt) => {
    setTime(selectedOpt.value);
  };

  useEffect(() => {
    if (
      name !== "" ||
      docNum !== "" ||
      docDate !== "" ||
      forUser !== "" ||
      section !== ""
    ) {
      const sectionCheck = section ? `&section=${section}` : "";
      const timeCheck = time ? `,${time}` : "";
      const searchByName = name ? `search=${name.toLowerCase()}&` : "";
      const searchByNumber = docNum ? `number=${docNum}&` : "";
      const searchByUser = forUser ? `for_user=${forUser}&` : "";
      const searchByDate = docDate ? `date=${docDate}&` : "";
      const searchBySection = section ? `section=${section}&` : "";
      console.log(searchBySection);

      // const url = `/files?search=${name.toLowerCase()}&number=${docNum}&date=${docDate}&sort=${
      const url = `/files?${searchByName}${searchByUser}${searchByDate}${searchByNumber}${searchBySection}sort=${
        sort + timeCheck
      }`;
      console.log(url, section);

      getDocsData(url, "GET", true);
    }
  }, [sort, section, time, name, docNum, docDate, forUser]);
  const file =
    "https://docs.google.com/uc?export=download&id=1kHs5nklr1tc75Mhwo-JZ7_uTRbvWowjy";
  const headers = {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    mode: "no-cors",
  };
  return (
    <React.Fragment>
      <div className="home search">
        <form action="#" className="search__form u-form">
          {/* <Input type="select" options={options} />
          <Input type="select" options={options} />
          <Input type="select" options={options} /> */}
          <Input type="select" options={options} onChange={sectionHandler} />
          <InputBox>
            <RiHashtag className="input-box__icon" />
            <Input
              type="text"
              placeholder="رقم الملف"
              onChange={(e) => setDocNum(e.target.value)}
              className="form__input input-box__input"
            />
          </InputBox>{" "}
          <InputBox>
            <RiUserSearchFill className="input-box__icon" />
            <Input
              type="text"
              placeholder="أسم الموظف الذي صدر اليه الكتاب"
              onChange={(e) => setForUser(e.target.value)}
              className="form__input input-box__input"
            />
          </InputBox>{" "}
          <Input
            type="date"
            // onChange={(e) => setDocDate(e.target.value)}
            onChange={(e) => setDocDate(e.target.value)}
            className="form__input input-box__input"
          />
          <InputBox className="grid--expand">
            <RiSearchLine className="input-box__icon" />
            <Input
              className="form__input input-box__input"
              placeholder="أدخل عنوان الملف..."
              type="search"
              name="search"
              id="search"
              onChange={(e) => {
                clearTimeout(typeTimer);
                typeTimer = setTimeout(() => setName(e.target.value), 1500);
              }}
            />
          </InputBox>
        </form>
        {isLoading ? (
          <div className="u-center-text">
            <Loader />
          </div>
        ) : null}
        <div className="pagination">
          {pagination}
          {/* {" "}
          <button
            className="pagination__back"
            onClick={() => setCurPage(curPage + 1)}
          >
            <MdEast /> Next
          </button>
          <button
            className="pagination__back"
            onClick={() => setCurPage(curPage - 1)}
          >
            Back
            <MdWest />
          </button> */}
        </div>
        {name !== "" && (
          <div className="u-center-text">
            <p className="paragraph">{`Got ${data?.results} documents from your search.`}</p>
          </div>
        )}

        <SearchResults>
          <Grid col="3">
            {data?.data.docs.map((book) => {
              return (
                <SearchResult
                  name={book.name}
                  key={book._id}
                  id={book._id}
                  pdf={book.pdfUrl}
                  user={book.user}
                  section={book.section}
                />
              );
            })}
          </Grid>
        </SearchResults>
      </div>
      {data?.results === 0 ? (
        <h2 className="heading--secondary">
          قاعدة البيانات خالية ولا تحتوي على أي ملف!
        </h2>
      ) : null}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
// export default connect(mapStateToProps, null)(Home);
export default Home;
