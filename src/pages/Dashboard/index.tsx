import { Carousel} from "antd";
import { dashboardStyle } from "../../styles";
import logoTres from '../../assets/logos/lostreslogos.png';
/* import logoColegio from '../../assets/logos/colegio.png';
import logoUdec from '../../assets/logos/udec.png'; */
import fondo from '../../assets/fondo.jpg';

import { Pages } from "../../constants/pages";
interface DashboardProps {
  setCurrentPage: (page: Pages) => void;
}
const contentStyle: React.CSSProperties = {
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F9FAFB',
};
const imageStyle: React.CSSProperties = {
  maxWidth: '1000px', // Limita el ancho de la imagen
  maxHeight: '500px', // Limita la altura de la imagen
  objectFit: 'contain', // Mantiene las proporciones
};
 

export const Dashboard = (setCurrentPage: DashboardProps) => {
  return (
    <div style={dashboardStyle.mainSector}>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        BIENVENIDOS AL CENTRO DE INVESTIGACION E INNOVACION AGROPECUARIA
      </h2>
      <Carousel autoplay={true} dots={true} autoplaySpeed={3000} arrows infinite={true}>
        <div>
          <h3 style={contentStyle}><img src={logoTres} alt="CIIAP" style={imageStyle} /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img src={fondo} alt="Fondo" /></h3>
        </div>
      </Carousel>
    </div>
  );
};
