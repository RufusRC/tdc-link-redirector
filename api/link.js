export default async function handler(req, res) {
  const { tdc } = req.query;

  if (!tdc) {
    return res.status(400).send("TDC não informado");
  }

  try {
    const response = await fetch("http://10.154.77.186:8085/wsToken.asmx/GetToken?user=ttt&password=tttt");
    const text = await response.text();

    // Extrai o token do XML
    const match = text.match(/<string[^>]*>(.*?)<\/string>/);
    const token = match ? match[1] : null;

    if (!token) {
      return res.status(500).send("Token não encontrado na resposta.");
    }

    const finalUrl = `http://servicoimagenseorderceara.enel.com.br/img_CE_pro/ConsultaImagem/Form?NumeroDoTDC=${tdc}&token=${token}`;
    return res.redirect(finalUrl);
  } catch (error) {
    return res.status(500).send("Erro ao obter token: " + error.message);
  }
}
