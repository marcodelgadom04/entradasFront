const Table = ({ children, col, off, table }) => {
  return (
    <div className="row mt-3">
      <div className={`col-md-${col} offset-md-${off}`}>
        {/* <div className={"card border border-white"}>
          <div className="card-body">
            <img src="/loading.gif" className="img-fluid" alt="" />
          </div>
        </div> */}
        <div className={"table-responsive" + table}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Table;
