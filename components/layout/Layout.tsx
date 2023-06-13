import { Container, Wrapper, Children, Image, ArrowBack } from "./styles";
import { useRouter } from "next/router";

const Layout: React.FC = ({ children }: any) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const moveBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <Container>
      <Wrapper>
        {currentPath !== "/" && (
          <ArrowBack
            src={"/assets/back_arrow.svg"}
            alt="Icon not found"
            onClick={moveBack}
          />
        )}

        <Image src={"/assets/logo.svg"} alt="Icon not found" />
      </Wrapper>

      <Children>{children}</Children>
    </Container>
  );
};

export default Layout;
