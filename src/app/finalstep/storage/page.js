import { jsx } from "react/jsx-runtime";
import FinalStepComp from "/src/app/components/finalstep.js";
function FinalStep() {
  return /* @__PURE__ */ jsx(FinalStepComp, { from: "storage", branchNum: "toronto" });
}
export {
  FinalStep as default
};
