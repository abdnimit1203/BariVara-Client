import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex  flex-col  justify-center  min-h-screen text-center space-y-4 text-xl font-semibold ">
            <img src="https://cdn-icons-png.flaticon.com/512/755/755014.png" alt="Error error error" className="w-60 mx-auto" />
            <h2 className="text-4xl text-error">Error 404</h2>
            <p>Page not found</p>
            <Link to={'/'}>
            <button className="btn btn-primary">Go home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;