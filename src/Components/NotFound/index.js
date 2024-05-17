import './index.css'

const NotFound = () => (
  <div className="notFoundPageContainer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notFoundPageImage"
    />
    <h1 className="notFoundPageHeading">Page Not Found</h1>
    <p className="notFoundPagePara">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
