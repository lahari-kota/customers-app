import React from "react";
import styled from "styled-components";

function CustomTable({ tableHeaders, tableData }) {
  return (
    <Wrapper className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            {tableHeaders.map((eachColName, index) => {
              return (
                <th style={{ ...eachColName.customStyleHeading }} key={index}>
                  {eachColName.heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((eachRow, index) => {
            return (
              <tr key={index}>
                {tableHeaders.map((eachColName) => {
                  return (
                    <td
                      key={eachColName.id}
                      style={
                        eachColName.customStylesForColumn
                          ? eachColName.customStylesForColumn
                          : {}
                      }
                    >
                      {eachColName.renderCell
                        ? eachColName.renderCell(eachRow)
                        : eachRow[eachColName.id] || "NA"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
  .custom-table {
    width: 100%;
    overflow: scroll;
  }
  table,
  th,
  td {
    border: 1px solid;
  }
  table {
    border-collapse: collapse;
  }
  td,
  th {
    font-size: 16px;
    padding: 10px 20px;
    text-align: left;
  }
`;

export default CustomTable;
