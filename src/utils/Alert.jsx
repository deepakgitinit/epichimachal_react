function Alert(props) {
  let type = props.alert.type;

  if (type == "danger") {
    return (
      <>
        {props.alert.message != "" && (
          <div className={`flex relative justify-center items-center`}>
            <div
              className={`fixed text-sm border-2 rounded-md px-2 bg-red-100 z-50`}
            >
              <p>{props.alert.message}</p>
            </div>
          </div>
        )}
      </>
    );
  }

  if (type == "success") {
    return (
      <>
        {props.alert.message != "" && (
          <div className={`flex relative justify-center items-center`}>
            <div
              className={`fixed text-sm border-2 rounded-md px-2 bg-green-100 z-50`}
            >
              <p>{props.alert.message}</p>
            </div>
          </div>
        )}
      </>
    );
  }
  
  if (type == "alert") {
    return (
      <>
        {props.alert.message != "" && (
          <div className={`flex relative justify-center items-center`}>
            <div
              className={`fixed text-sm border-2 rounded-md px-2 bg-gray-100 z-50`}
            >
              <p>{props.alert.message}</p>
            </div>
          </div>
        )}
      </>
    );
  }
}

export { Alert };
