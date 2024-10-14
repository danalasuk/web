// A MUST READ!
// for example, how to use the “scripts” folder.
// here you will find important functions for your work
// You will need to learn each function, you can just learn what each function does by typing it into CHATGPT. 

/**
 * 
 * @param {*} element 
 * @param {*} className 
 */
function addClass(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

/**
 * 
 * @param {*} element 
 * @param {*} className 
 */
function removeClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

/**
 * 
 * @param {*} element 
 * @param {*} className 
 */
function toggleClass(element, className) {
    element.classList.toggle(className);
}

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPhoneNumberValid(phone) {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(phone);
}

function isURLValid(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function addDaysToDate(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

function daysBetweenDates(date1, date2) {
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    return Math.round(diffInTime / oneDay);
}

function arrayUnique(arr) {
    return [...new Set(arr)];
}

function arrayFlatten(arr) {
    return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? arrayFlatten(toFlatten) : toFlatten), []);
}

function arrayChunk(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object) {
            Object.assign(source[key], deepMerge(target[key] || {}, source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function updateQueryParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function (...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryAsync(func, retries = 3, delayMs = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await func();
        } catch (e) {
            if (i < retries - 1) {
                await delay(delayMs);
            } else {
                throw e;
            }
        }
    }
}