import alfy from "alfy";
import md5 from "md5";

const resut = md5(alfy.input)

alfy.output([{
  title: resut,
  subtitle: '回车复制结果',
  arg: resut,
}])