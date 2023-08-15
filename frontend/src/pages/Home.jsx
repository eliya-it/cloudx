import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchResult from "../components/SearchResults/SearchResult/SearchResult";
import SearchResults from "../components/SearchResults/SearchResults";
import Loader from "../components/UI/Loader/Loader";
import Modal from "../components/UI/Modal/Modal";
import Layout from "../containers/Layout/Layout";
import useHttp from "../hooks/http";
import img from "../assets/img/user.jpg";
import Select from "react-select";
import Grid from "../containers/Layout/Grid/Grid";
import Message from "../components/Message/Message";
import { MdEast, MdWest, MdDateRange } from "react-icons/md";
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
  const [sort, setSort] = useState("-createdAt");
  const [time, setTime] = useState("");
  const [section, setSection] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [docNum, setDocNum] = useState("");
  const [docDate, setDocDate] = useState("");
  const [docEmpName, setDocEmpName] = useState("");
  // const [start, setStart] = useState(0);
  // const [end, setEnd] = useState(7);
  const start = (curPage - 1) * limit;
  const end = curPage * limit;
  const { sendRequest: getDocsData, isLoading, data, error } = useHttp();
  const [pagesLength, setPagesLength] = useState([]);
  let pagination;

  const options = [
    {
      value: "IT",
      label: "IT",
    },
    {
      value: "title",
      label: "Title",
    },
  ];
  const sectionHandler = (e) => {
    console.log(e.target.value);
    // selectedOpt.map((opt) => setSection([...section, opt.value]));
    setSection(e.target.value);
  };
  const sortHandler = (selectedOpt) => {
    setSort(selectedOpt.value);
  };
  const sortByTimeHandler = (selectedOpt) => {
    setTime(selectedOpt.value);
  };

  useEffect(() => {
    const sectionCheck = section ? `&section=${section}` : "";
    const timeCheck = time ? `,${time}` : "";
    const url = `http://127.0.0.1/api/books?sort=${
      sort + timeCheck
    }${sectionCheck}`;

    getDocsData(url, "GET", true);
    console.log(docEmpName);
  }, [sort, section, time]);

  const allPages = Math.ceil(data?.length / limit);

  if (curPage === 1 && allPages > 1) {
    pagination = (
      <button
        className="pagination__next"
        onClick={() => setCurPage(curPage + 1)}
      >
        <MdEast />
        Page
        {curPage + 1}
      </button>
    );
  }
  // Last page
  if (curPage === allPages && allPages > 1) {
    pagination = (
      <button
        className="pagination__back"
        onClick={() => setCurPage(curPage - 1)}
      >
        Page
        <MdWest />
        {curPage - 1}
      </button>
    );
    console.log("page 2");
  }
  if (curPage < allPages) {
    pagination = [
      <button
        className="pagination__next"
        onClick={() => setCurPage(curPage + 1)}
      >
        <MdEast />
        Page
        {curPage + 1}
      </button>,
      <button
        className="pagination__back"
        onClick={() => setCurPage(curPage - 1)}
      >
        Page
        <MdWest />
        {curPage - 1}
      </button>,
    ];
  }
  if (curPage === 1 && curPage > limit)
    pagination = (
      <button
        className="pagination__next"
        onClick={() => setCurPage(curPage + 1)}
      >
        <MdEast />
        Page
        {curPage + 1}
      </button>
    );

  return (
    <React.Fragment>
      {/* {error ? <Message text={error?.response} err={true} /> : null} */}

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
              placeholder="Search for book number"
              onChange={(e) => setDocNum(e.target.value)}
              className="form__input input-box__input"
            />
          </InputBox>{" "}
          <InputBox>
            <RiUserSearchFill className="input-box__icon" />
            <Input
              type="text"
              placeholder="Search for book Empolyer name"
              onChange={(e) => setDocEmpName(e.target.value)}
              className="form__input input-box__input"
            />
          </InputBox>{" "}
          <InputBox>
            <RiCalendar2Fill className="input-box__icon" />
            <Input
              type="text"
              placeholder="Search for book date"
              onChange={(e) => setDocDate(e.target.value)}
              className="form__input input-box__input"
            />
          </InputBox>{" "}
          <InputBox className="grid--expand">
            <RiSearchLine className="input-box__icon" />
            <Input
              className="form__input input-box__input"
              placeholder="أدخل عنوان الكتاب..."
              type="search"
              name="search"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
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
        <SearchResults>
          <Grid col="3">
            {data?.data.docs
              .filter((item) => {
                // Check for  number, date and empName
                if (
                  docEmpName &&
                  docEmpName !== "" &&
                  docNum &&
                  docNum !== "" &&
                  docDate &&
                  docDate !== "" &&
                  search &&
                  search !== " "
                )
                  return (
                    item.forEmp?.toLowerCase().includes(docEmpName) &&
                    item.docNum?.includes(docNum) &&
                    item.docDate?.includes(docDate) &&
                    item.title?.toLowerCase().includes(search)
                  );
                // Check for  number, date and empName
                if (
                  docEmpName &&
                  docEmpName !== "" &&
                  docNum &&
                  docNum !== "" &&
                  docDate &&
                  docDate !== ""
                )
                  return (
                    item.forEmp?.toLowerCase().includes(docEmpName) &&
                    item.docNum?.includes(docNum) &&
                    item.docDate?.includes(docDate)
                  );
                // Check for  number and date
                if (docNum && docNum !== "" && docDate && docDate !== "")
                  return (
                    item.docNum?.includes(docNum) &&
                    item.docDate?.includes(docDate)
                  );
                // Check for number and empName.
                if (
                  docNum &&
                  docNum !== " " &&
                  docEmpName &&
                  docEmpName !== " "
                )
                  return (
                    item.docNum?.includes(docNum) &&
                    item.forEmp?.toLowerCase().includes(docEmpName)
                  );
                // Check for date and empName.
                if (
                  docDate &&
                  docDate !== " " &&
                  docEmpName &&
                  docEmpName !== " "
                )
                  return (
                    item.docDate?.includes(docDate) &&
                    item.forEmp?.toLowerCase().includes(docEmpName)
                  );
                // Check for search with docNum
                if (search && search !== " " && docNum && docNum !== " ")
                  return (
                    item.title?.toLowerCase().includes(search) &&
                    item.docNum?.includes(docNum)
                  );
                // Check for search with docEmpName.
                if (
                  search &&
                  search !== " " &&
                  docEmpName &&
                  docEmpName !== " "
                )
                  return (
                    item.title?.toLowerCase().includes(search) &&
                    item.forEmp?.toLowerCase().includes(docEmpName)
                  );
                // Check for search with docDate
                if (search && search !== " " && docDate && docDate !== " ")
                  return (
                    item.title?.toLowerCase().includes(search) &&
                    item.docDate?.includes(docDate)
                  );
                // Check for doc number
                if (docNum) return item.docNum?.includes(docNum);
                // Check for doc date
                if (docDate) return item.docDate?.includes(docDate);
                // Check for doc empName
                if (docEmpName)
                  return item?.forEmp?.toLowerCase()?.includes(docEmpName);

                // Check for doc Title
                if (search && search !== "")
                  return item.title?.toLowerCase().includes(search);
              })
              .slice(start, end)
              .map((book) => {
                return (
                  <SearchResult
                    name={book.title}
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
      {data?.data?.docs?.results === 0 ? (
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
/*
  // const colorStyles = {
  //   control: (styles) => ({ ...styles, backgroundColor: "#ccc" }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     console.log("Option => ", data, isDisabled, isFocused, isSelected);
  //     return { ...styles, color: "#ce1" };
  //   },
  //   multiValue: (styles, { data }) => {
  //     return {
  //       ...styles,
  //       backgroundColor: "#ca4",
  //       color: "#fff",
  //     };
  //   },
  //   multiValueLabel: (styles, { data }) => {
  //     return {
  //       ...styles,
  //       color: "red",
  //     };
  //   },
  //   multiValueRemove: (styles, { data }) => {
  //     return {
  //       ...styles,
  //       ":hover": {
  //         cursor: "pointer",
  //       },
  //     };
  //   },
  // };
*/
