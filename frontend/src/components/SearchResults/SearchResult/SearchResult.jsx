import React from "react";
import { Link } from "react-router-dom";
import Grid from "../../../containers/Layout/Grid/Grid";
import {
  MdArticle,
  MdDateRange,
  MdAccessTime,
  MdSupervisorAccount,
} from "react-icons/md";
const SearchResult = (props) => {
  return (
    <Link className="search-results__result" to={`/book/${props.id}`}>
      <p className="search-results__result__heading">{props.name}</p>
      <ul className="search-results__result__info">
        <li className="u-list__item">
          <MdArticle className="search-results__result__icon" />
          {props.section}
        </li>
        <li className="u-list__item">
          <MdDateRange className="search-results__result__icon" />
          2022/4/1
        </li>
        <li className="u-list__item">
          <MdAccessTime className="search-results__result__icon" />
          20:20
        </li>
        <li className="u-list__item">
          <MdSupervisorAccount className="search-results__result__icon" />
          Public
        </li>
      </ul>
      <div className="search-results__user">
        <p className="search-results__user__name">{props.user.name}</p>
        <p className="search-results__user__section">{props.user.department}</p>
      </div>
    </Link>
  );
};

export default SearchResult;
