import alfy from "alfy";

alfy.output([{
  title: Buffer.from(alfy.input).toString('base64'),
  subtitle: 'base64转码',
  arg: Buffer.from(alfy.input).toString('base64'),
}, {
  title: Buffer.from(alfy.input, 'base64').toString(),
  subtitle: 'base64解码',
  arg: Buffer.from(alfy.input, 'base64').toString(),
}])
