var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { blogArticles } from '@/lib/blog-data';
function parseArticleDate(dateString) {
    var months = {
        'Jan': '01', 'Fév': '02', 'Mar': '03', 'Avr': '04', 'Mai': '05', 'Jun': '06',
        'Jul': '07', 'Aoû': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Déc': '12'
    };
    var parts = dateString.split(' ');
    if (parts.length === 3) {
        var day = parts[0].padStart(2, '0');
        var month = months[parts[1]] || '01';
        var year = parts[2];
        return new Date("".concat(year, "-").concat(month, "-").concat(day));
    }
    return new Date();
}
export default function sitemap() {
    var blogUrls = blogArticles.map(function (article) { return ({
        url: "https://cma-education.com/blog/".concat(article.id),
        lastModified: parseArticleDate(article.date),
        changeFrequency: 'monthly',
        priority: 0.8,
    }); });
    return __spreadArray([
        {
            url: 'https://cma-education.com/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        }
    ], blogUrls, true);
}
