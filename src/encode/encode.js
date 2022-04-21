import alfy from "alfy";

alfy.output([{
  title: encodeURI(alfy.input),
  subtitle: 'encodeUrl',
  arg: encodeURI(alfy.input),
}, {
  title: encodeURIComponent(alfy.input),
  subtitle: 'encodeURIComponent',
  arg: encodeURIComponent(alfy.input),
}])