import alfy from "alfy";

alfy.output([{
  title: decodeURI(alfy.input),
  subtitle: 'decodeURI',
  arg: decodeURI(alfy.input),
}, {
  title: decodeURIComponent(alfy.input),
  subtitle: 'decodeURIComponent',
  arg: decodeURIComponent(alfy.input),
}])