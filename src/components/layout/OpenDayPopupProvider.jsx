'use client';
import { useOpenDayPopup } from '@/hooks/useOpenDayPopup';
import OpenDayPopup from '@/components/ui/OpenDayPopup';
export default function OpenDayPopupProvider() {
    var _a = useOpenDayPopup(), isVisible = _a.isVisible, closePopup = _a.closePopup;
    return (<OpenDayPopup isVisible={isVisible} onClose={closePopup}/>);
}
