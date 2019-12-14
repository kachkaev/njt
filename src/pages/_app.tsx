import App from "next/app";

class MyApp extends App {
  componentDidMount() {
    document.body.className = (document.body.className || "").replace(
      "no-js",
      "js",
    );
  }
}

export default MyApp;
