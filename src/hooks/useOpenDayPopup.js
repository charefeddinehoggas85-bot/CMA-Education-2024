'use client';
import { useState, useEffect } from 'react';
var POPUP_STORAGE_KEY = 'cma-open-day-popup-dismissed';
var POPUP_DELAY = 3000; // 3 secondes après le chargement de la page
export function useOpenDayPopup() {
    var _a = useState(false), isVisible = _a[0], setIsVisible = _a[1];
    useEffect(function () {
        // Vérifier si la popup a déjà été fermée aujourd'hui
        var checkShouldShow = function () {
            try {
                var dismissed = localStorage.getItem(POPUP_STORAGE_KEY);
                if (dismissed) {
                    var dismissedDate = new Date(dismissed);
                    var today = new Date();
                    // Si c'est le même jour, ne pas afficher
                    if (dismissedDate.getDate() === today.getDate() &&
                        dismissedDate.getMonth() === today.getMonth() &&
                        dismissedDate.getFullYear() === today.getFullYear()) {
                        return false;
                    }
                }
                return true;
            }
            catch (_a) {
                return true;
            }
        };
        // Afficher la popup après un délai si elle n'a pas été fermée aujourd'hui
        if (checkShouldShow()) {
            var timer_1 = setTimeout(function () {
                setIsVisible(true);
            }, POPUP_DELAY);
            return function () { return clearTimeout(timer_1); };
        }
    }, []);
    var closePopup = function () {
        setIsVisible(false);
        // Enregistrer la fermeture dans localStorage
        try {
            localStorage.setItem(POPUP_STORAGE_KEY, new Date().toISOString());
        }
        catch (_a) {
            // Ignorer les erreurs de localStorage (mode privé, etc.)
        }
    };
    return {
        isVisible: isVisible,
        closePopup: closePopup
    };
}
