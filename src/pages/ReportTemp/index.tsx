import { dashboardStyle } from "../../styles";
import { ReportTable } from "../../components/ReportTable";


export const ReportTempPage = () => {
  return (
    <div style={dashboardStyle.mainSector}>
      <div>
        <ReportTable />
      </div>
    </div>
  );
};
