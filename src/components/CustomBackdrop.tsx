import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const CustomBackdrop = props => {
    return (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={false}
        opacity={0.6}
      />
    );
  };

  export default CustomBackdrop