import { useRouter } from "next/router";
import CharacterDetails from "../../components/rickAndMorty/CharacterDetails";

const LocationDetails: React.FC = () => {
  const router = useRouter();
  const { itemId } = router.query;

  return (
    <div>
      <CharacterDetails id={itemId} />
    </div>
  );
};

export default LocationDetails;
