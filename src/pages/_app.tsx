import App from "next/app";
import PageLayout from "../ui/PageLayout";

class MyApp extends App {
  componentDidMount() {
    document.body.className = (document.body.className || "").replace(
      "no-js",
      "js",
    );
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    );
  }
}

export default MyApp;
