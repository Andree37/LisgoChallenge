export default function useLocalStorage() {
    function setItem(key, valueToStore) {
        // add 1 day to exp date
        let expTime = new Date();
        expTime.setDate(new Date().getDate() + 1);
        let obj = {
            expTime,
            data: valueToStore
        }
        window.localStorage.setItem(key, JSON.stringify(obj));
    }

    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            let x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    function getItem(key) {
        let item = window.localStorage.getItem(key);
        if (item && item.expTime > new Date()) {
            //check if exp has passed
            window.localStorage.removeItem(key);
            return undefined
        }
        return item;
    }

    return {
        getItem,
        setItem,
        storageAvailable,
    }
}