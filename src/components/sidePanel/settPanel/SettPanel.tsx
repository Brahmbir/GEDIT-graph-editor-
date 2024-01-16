import FieldGroup from "../components/fieldGroup/FieldGroup";
import Heading from "../components/heading/Headind";
import EBackground from "./settComps/eBackGround/EBackGround";
import ThemeGroup from "./settComps/themeGroup/ThemeGroup";

export interface ISettingProps {}

export default function SettingPanel(_props: ISettingProps) {
  return (
    <>
      <Heading>Settings</Heading>
      <FieldGroup tittle="editor background">
        <EBackground />
      </FieldGroup>
      <ThemeGroup />
    </>
  );
}
