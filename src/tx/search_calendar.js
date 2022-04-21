import alfy from "alfy";
import moment from "moment";

const month = moment().month() + 1;

alfy.output(new Array(13 - month).fill(0).map((val, ind) => ({
  title: ind === 0 ? '本月' : `${ind + month}月`,
  subtitle: `${moment().year()}年${ind + month}月`,
  arg: `${moment().year()}-${ind + month}`,
})))
