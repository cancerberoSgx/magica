[magica](../README.md) › ["imageMagick/imLists"](../modules/_imagemagick_imlists_.md) › [imList](../modules/_imagemagick_imlists_.imlist.md) › [Delegate](_imagemagick_imlists_.imlist.delegate.md)

# Enumeration: Delegate

## Index

### Enumeration members

* [](_imagemagick_imlists_.imlist.delegate.md#)
* [-------------------------------------------------------------------------------](_imagemagick_imlists_.imlist.delegate.md#-------------------------------------------------------------------------------)
* [Delegate                Command](_imagemagick_imlists_.imlist.delegate.md#delegate----------------command)
* [Path: built-in](_imagemagick_imlists_.imlist.delegate.md#path:-built-in)
* [bmp<= jxr       "mv '%i' '%i.bmp'; 'JxrEncApp' -i '%i.bmp' -o '%o.jxr'; mv '%i.bmp' '%i'; mv '%o.jxr' '%o"](_imagemagick_imlists_.imlist.delegate.md#bmp&lt;&#x3D;-jxr-------mv-&#x27;%i&#x27;-&#x27;%i.bmp&#x27;;-&#x27;jxrencapp&#x27;--i-&#x27;%i.bmp&#x27;--o-&#x27;%o.jxr&#x27;;-mv-&#x27;%i.bmp&#x27;-&#x27;%i&#x27;;-mv-&#x27;%o.jxr&#x27;-&#x27;%o)
* [bmp<= wdp       "mv '%i' '%i.bmp'; 'JxrEncApp' -i '%i.bmp' -o '%o.jxr'; mv '%i.bmp' '%i'; mv '%o.jxr' '%o"](_imagemagick_imlists_.imlist.delegate.md#bmp&lt;&#x3D;-wdp-------mv-&#x27;%i&#x27;-&#x27;%i.bmp&#x27;;-&#x27;jxrencapp&#x27;--i-&#x27;%i.bmp&#x27;--o-&#x27;%o.jxr&#x27;;-mv-&#x27;%i.bmp&#x27;-&#x27;%i&#x27;;-mv-&#x27;%o.jxr&#x27;-&#x27;%o)
* [bpg =>          "bpgdec' -b 16 -o '%o.png' '%i'; mv '%o.png' '%o"](_imagemagick_imlists_.imlist.delegate.md#bpg-&#x3D;&gt;----------bpgdec&#x27;--b-16--o-&#x27;%o.png&#x27;-&#x27;%i&#x27;;-mv-&#x27;%o.png&#x27;-&#x27;%o)
* [cdr =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"](_imagemagick_imlists_.imlist.delegate.md#cdr-&#x3D;&gt;----------uniconvertor&#x27;-&#x27;%i&#x27;-&#x27;%o.svg&#x27;;-mv-&#x27;%o.svg&#x27;-&#x27;%o)
* [cgm =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"](_imagemagick_imlists_.imlist.delegate.md#cgm-&#x3D;&gt;----------uniconvertor&#x27;-&#x27;%i&#x27;-&#x27;%o.svg&#x27;;-mv-&#x27;%o.svg&#x27;-&#x27;%o)
* [dng:decode =>          "ufraw-batch' --silent --create-id=also --out-type=png --out-depth=16 '--output=%u.png' '%i"](_imagemagick_imlists_.imlist.delegate.md#dng:decode-&#x3D;&gt;----------ufraw-batch&#x27;---silent---create-id&#x3D;also---out-type&#x3D;png---out-depth&#x3D;16-&#x27;--output&#x3D;%u.png&#x27;-&#x27;%i)
* [doc =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"](_imagemagick_imlists_.imlist.delegate.md#doc-&#x3D;&gt;----------soffice&#x27;---convert-to-pdf--outdir-&#x60;dirname-&#x27;%i&#x27;&#x60;-&#x27;%i&#x27;-2&gt;-&#x27;%u&#x27;;-mv-&#x27;%i.pdf&#x27;-&#x27;%o)
* [docx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"](_imagemagick_imlists_.imlist.delegate.md#docx-&#x3D;&gt;----------soffice&#x27;---convert-to-pdf--outdir-&#x60;dirname-&#x27;%i&#x27;&#x60;-&#x27;%i&#x27;-2&gt;-&#x27;%u&#x27;;-mv-&#x27;%i.pdf&#x27;-&#x27;%o)
* [dot =>          "dot' -Tsvg '%i' -o '%o"](_imagemagick_imlists_.imlist.delegate.md#dot-&#x3D;&gt;----------dot&#x27;--tsvg-&#x27;%i&#x27;--o-&#x27;%o)
* [dvi =>          "dvips' -sstdout=%%stderr -o '%o' '%i"](_imagemagick_imlists_.imlist.delegate.md#dvi-&#x3D;&gt;----------dvips&#x27;--sstdout&#x3D;%%stderr--o-&#x27;%o&#x27;-&#x27;%i)
* [dxf =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"](_imagemagick_imlists_.imlist.delegate.md#dxf-&#x3D;&gt;----------uniconvertor&#x27;-&#x27;%i&#x27;-&#x27;%o.svg&#x27;;-mv-&#x27;%o.svg&#x27;-&#x27;%o)
* [eps<=>pdf       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 '-sDEVICE=pdfwrite' '-sOutputFile=%o' '-f%i"](_imagemagick_imlists_.imlist.delegate.md#eps&lt;&#x3D;&gt;pdf-------gs&#x27;--sstdout&#x3D;%%stderr--dquiet--dsafer--dbatch--dnopause--dnoprompt--dmaxbitmap&#x3D;500000000-&#x27;-sdevice&#x3D;pdfwrite&#x27;-&#x27;-soutputfile&#x3D;%o&#x27;-&#x27;-f%i)
* [eps<=>ps        "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=ps2write' '-sOutputFile=%o' '-f%i"](_imagemagick_imlists_.imlist.delegate.md#eps&lt;&#x3D;&gt;ps--------gs&#x27;--sstdout&#x3D;%%stderr--dquiet--dsafer--dbatch--dnopause--dnoprompt--dmaxbitmap&#x3D;500000000--daligntopixels&#x3D;0--dgridfittt&#x3D;2-&#x27;-sdevice&#x3D;ps2write&#x27;-&#x27;-soutputfile&#x3D;%o&#x27;-&#x27;-f%i)
* [fig =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"](_imagemagick_imlists_.imlist.delegate.md#fig-&#x3D;&gt;----------uniconvertor&#x27;-&#x27;%i&#x27;-&#x27;%o.svg&#x27;;-mv-&#x27;%o.svg&#x27;-&#x27;%o)
* [hpg =>          "hp2xx' -sstdout=%%stderr -m eps -f `basename '%o'` '%i';     mv -f `basename '%o'` '%o"](_imagemagick_imlists_.imlist.delegate.md#hpg-&#x3D;&gt;----------hp2xx&#x27;--sstdout&#x3D;%%stderr--m-eps--f-&#x60;basename-&#x27;%o&#x27;&#x60;-&#x27;%i&#x27;;-----mv--f-&#x60;basename-&#x27;%o&#x27;&#x60;-&#x27;%o)
* [hpgl =>          "hp2xx' -sstdout=%%stderr -m eps -f `basename '%o'` '%i';     mv -f `basename '%o'` '%o"](_imagemagick_imlists_.imlist.delegate.md#hpgl-&#x3D;&gt;----------hp2xx&#x27;--sstdout&#x3D;%%stderr--m-eps--f-&#x60;basename-&#x27;%o&#x27;&#x60;-&#x27;%i&#x27;;-----mv--f-&#x60;basename-&#x27;%o&#x27;&#x60;-&#x27;%o)
* [htm =>          "html2ps' -U -o '%o' '%i"](_imagemagick_imlists_.imlist.delegate.md#htm-&#x3D;&gt;----------html2ps&#x27;--u--o-&#x27;%o&#x27;-&#x27;%i)
* [html =>          "html2ps' -U -o '%o' '%i"](_imagemagick_imlists_.imlist.delegate.md#html-&#x3D;&gt;----------html2ps&#x27;--u--o-&#x27;%o&#x27;-&#x27;%i)
* [https =>          "curl' -s -k -L -o '%o' 'https:%M"](_imagemagick_imlists_.imlist.delegate.md#https-&#x3D;&gt;----------curl&#x27;--s--k--l--o-&#x27;%o&#x27;-&#x27;https:%m)
* [ilbm =>          "ilbmtoppm' '%i' > '%o"](_imagemagick_imlists_.imlist.delegate.md#ilbm-&#x3D;&gt;----------ilbmtoppm&#x27;-&#x27;%i&#x27;-&gt;-&#x27;%o)
* [jpg<= lep       "lepton' '%i' '%o"](_imagemagick_imlists_.imlist.delegate.md#jpg&lt;&#x3D;-lep-------lepton&#x27;-&#x27;%i&#x27;-&#x27;%o)
* [jxr =>          "mv '%i' '%i.jxr'; 'JxrDecApp' -i '%i.jxr' -o '%o.pnm'; mv '%i.jxr' '%i'; mv '%o.pnm' '%o"](_imagemagick_imlists_.imlist.delegate.md#jxr-&#x3D;&gt;----------mv-&#x27;%i&#x27;-&#x27;%i.jxr&#x27;;-&#x27;jxrdecapp&#x27;--i-&#x27;%i.jxr&#x27;--o-&#x27;%o.pnm&#x27;;-mv-&#x27;%i.jxr&#x27;-&#x27;%i&#x27;;-mv-&#x27;%o.pnm&#x27;-&#x27;%o)
* [lep =>          "lepton' '%i' '%o"](_imagemagick_imlists_.imlist.delegate.md#lep-&#x3D;&gt;----------lepton&#x27;-&#x27;%i&#x27;-&#x27;%o)
* [mpeg:decode =>          "avconv' -v -1 -i '%i' -vframes %S -vcodec pam -an -f rawvideo -y '%u.pam' 2> '%u"](_imagemagick_imlists_.imlist.delegate.md#mpeg:decode-&#x3D;&gt;----------avconv&#x27;--v--1--i-&#x27;%i&#x27;--vframes-%s--vcodec-pam--an--f-rawvideo--y-&#x27;%u.pam&#x27;-2&gt;-&#x27;%u)
* [odt =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"](_imagemagick_imlists_.imlist.delegate.md#odt-&#x3D;&gt;----------soffice&#x27;---convert-to-pdf--outdir-&#x60;dirname-&#x27;%i&#x27;&#x60;-&#x27;%i&#x27;-2&gt;-&#x27;%u&#x27;;-mv-&#x27;%i.pdf&#x27;-&#x27;%o)
* [pdf<=>eps       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 -sPDFPassword='%a' '-sDEVICE=eps2write' '-sOutputFile=%o' '-f%i"](_imagemagick_imlists_.imlist.delegate.md#pdf&lt;&#x3D;&gt;eps-------gs&#x27;--sstdout&#x3D;%%stderr--dquiet--dsafer--dbatch--dnopause--dnoprompt--dmaxbitmap&#x3D;500000000--daligntopixels&#x3D;0--dgridfittt&#x3D;2--spdfpassword&#x3D;&#x27;%a&#x27;-&#x27;-sdevice&#x3D;eps2write&#x27;-&#x27;-soutputfile&#x3D;%o&#x27;-&#x27;-f%i)
* [pdf<=>ps        "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=ps2write' -sPDFPassword='%a' '-sOutputFile=%o' '-f%i"](_imagemagick_imlists_.imlist.delegate.md#pdf&lt;&#x3D;&gt;ps--------gs&#x27;--sstdout&#x3D;%%stderr--dquiet--dsafer--dbatch--dnopause--dnoprompt--dmaxbitmap&#x3D;500000000--daligntopixels&#x3D;0--dgridfittt&#x3D;2-&#x27;-sdevice&#x3D;ps2write&#x27;--spdfpassword&#x3D;&#x27;%a&#x27;-&#x27;-soutputfile&#x3D;%o&#x27;-&#x27;-f%i)
* [png<= bpg       "bpgenc' -b 12 -q %~ -o '%o' '%i"](_imagemagick_imlists_.imlist.delegate.md#png&lt;&#x3D;-bpg-------bpgenc&#x27;--b-12--q-%~--o-&#x27;%o&#x27;-&#x27;%i)
* [png<= webp      "cwebp' -quiet -q %Q '%i' -o '%o"](_imagemagick_imlists_.imlist.delegate.md#png&lt;&#x3D;-webp------cwebp&#x27;--quiet--q-%q-&#x27;%i&#x27;--o-&#x27;%o)
* [pnm<= ilbm      "ppmtoilbm' -24if '%i' > '%o"](_imagemagick_imlists_.imlist.delegate.md#pnm&lt;&#x3D;-ilbm------ppmtoilbm&#x27;--24if-&#x27;%i&#x27;-&gt;-&#x27;%o)
* [ppt =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"](_imagemagick_imlists_.imlist.delegate.md#ppt-&#x3D;&gt;----------soffice&#x27;---convert-to-pdf--outdir-&#x60;dirname-&#x27;%i&#x27;&#x60;-&#x27;%i&#x27;-2&gt;-&#x27;%u&#x27;;-mv-&#x27;%i.pdf&#x27;-&#x27;%o)
* [pptx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"](_imagemagick_imlists_.imlist.delegate.md#pptx-&#x3D;&gt;----------soffice&#x27;---convert-to-pdf--outdir-&#x60;dirname-&#x27;%i&#x27;&#x60;-&#x27;%i&#x27;-2&gt;-&#x27;%u&#x27;;-mv-&#x27;%i.pdf&#x27;-&#x27;%o)
* [ps<= print     "lpr '%i"](_imagemagick_imlists_.imlist.delegate.md#ps&lt;&#x3D;-print-----lpr-&#x27;%i)
* [ps<= prt       "lpr' '%i"](_imagemagick_imlists_.imlist.delegate.md#ps&lt;&#x3D;-prt-------lpr&#x27;-&#x27;%i)
* [ps<=>eps       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=eps2write' '-sOutputFile=%o' '-f%i"](_imagemagick_imlists_.imlist.delegate.md#ps&lt;&#x3D;&gt;eps-------gs&#x27;--sstdout&#x3D;%%stderr--dquiet--dsafer--dbatch--dnopause--dnoprompt--dmaxbitmap&#x3D;500000000--daligntopixels&#x3D;0--dgridfittt&#x3D;2-&#x27;-sdevice&#x3D;eps2write&#x27;-&#x27;-soutputfile&#x3D;%o&#x27;-&#x27;-f%i)
* [ps<=>pdf       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=pdfwrite' '-sOutputFile=%o' '-f%i"](_imagemagick_imlists_.imlist.delegate.md#ps&lt;&#x3D;&gt;pdf-------gs&#x27;--sstdout&#x3D;%%stderr--dquiet--dsafer--dbatch--dnopause--dnoprompt--dmaxbitmap&#x3D;500000000--daligntopixels&#x3D;0--dgridfittt&#x3D;2-&#x27;-sdevice&#x3D;pdfwrite&#x27;-&#x27;-soutputfile&#x3D;%o&#x27;-&#x27;-f%i)
* [shtml =>          "html2ps' -U -o '%o' '%i"](_imagemagick_imlists_.imlist.delegate.md#shtml-&#x3D;&gt;----------html2ps&#x27;--u--o-&#x27;%o&#x27;-&#x27;%i)
* [sid =>          "mrsidgeodecode' -if sid -i '%i' -of tif -o '%o' > '%u"](_imagemagick_imlists_.imlist.delegate.md#sid-&#x3D;&gt;----------mrsidgeodecode&#x27;--if-sid--i-&#x27;%i&#x27;--of-tif--o-&#x27;%o&#x27;-&gt;-&#x27;%u)
* [svg =>          "rsvg-convert' -o '%o' '%i"](_imagemagick_imlists_.imlist.delegate.md#svg-&#x3D;&gt;----------rsvg-convert&#x27;--o-&#x27;%o&#x27;-&#x27;%i)
* [tiff<= launch    "gimp' '%i"](_imagemagick_imlists_.imlist.delegate.md#tiff&lt;&#x3D;-launch----gimp&#x27;-&#x27;%i)
* [wdp =>          "mv '%i' '%i.jxr'; 'JxrDecApp' -i '%i.jxr' -o '%o.bmp'; mv '%i.jxr' '%i'; mv '%o.bmp' '%o"](_imagemagick_imlists_.imlist.delegate.md#wdp-&#x3D;&gt;----------mv-&#x27;%i&#x27;-&#x27;%i.jxr&#x27;;-&#x27;jxrdecapp&#x27;--i-&#x27;%i.jxr&#x27;--o-&#x27;%o.bmp&#x27;;-mv-&#x27;%i.jxr&#x27;-&#x27;%i&#x27;;-mv-&#x27;%o.bmp&#x27;-&#x27;%o)
* [webp =>          "dwebp' -pam '%i' -o '%o"](_imagemagick_imlists_.imlist.delegate.md#webp-&#x3D;&gt;----------dwebp&#x27;--pam-&#x27;%i&#x27;--o-&#x27;%o)
* [xls =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"](_imagemagick_imlists_.imlist.delegate.md#xls-&#x3D;&gt;----------soffice&#x27;---convert-to-pdf--outdir-&#x60;dirname-&#x27;%i&#x27;&#x60;-&#x27;%i&#x27;-2&gt;-&#x27;%u&#x27;;-mv-&#x27;%i.pdf&#x27;-&#x27;%o)
* [xlsx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"](_imagemagick_imlists_.imlist.delegate.md#xlsx-&#x3D;&gt;----------soffice&#x27;---convert-to-pdf--outdir-&#x60;dirname-&#x27;%i&#x27;&#x60;-&#x27;%i&#x27;-2&gt;-&#x27;%u&#x27;;-mv-&#x27;%i.pdf&#x27;-&#x27;%o)

## Enumeration members

• ****: = ""

Defined in imageMagick/imLists.ts:1821

___

###  -------------------------------------------------------------------------------

• **-------------------------------------------------------------------------------**: = "-------------------------------------------------------------------------------"

Defined in imageMagick/imLists.ts:1824

___

###  Delegate                Command

• **Delegate                Command**: = "Delegate                Command"

Defined in imageMagick/imLists.ts:1823

___

###  Path: built-in

• **Path: built-in**: = "Path: built-in"

Defined in imageMagick/imLists.ts:1822

___

###  bmp<= jxr       "mv '%i' '%i.bmp'; 'JxrEncApp' -i '%i.bmp' -o '%o.jxr'; mv '%i.bmp' '%i'; mv '%o.jxr' '%o"

• **bmp<= jxr       "mv '%i' '%i.bmp'; 'JxrEncApp' -i '%i.bmp' -o '%o.jxr'; mv '%i.bmp' '%i'; mv '%o.jxr' '%o"**: = "bmp<= jxr       "mv '%i' '%i.bmp'; 'JxrEncApp' -i '%i.bmp' -o '%o.jxr'; mv '%i.bmp' '%i'; mv '%o.jxr' '%o""

Defined in imageMagick/imLists.ts:1826

___

###  bmp<= wdp       "mv '%i' '%i.bmp'; 'JxrEncApp' -i '%i.bmp' -o '%o.jxr'; mv '%i.bmp' '%i'; mv '%o.jxr' '%o"

• **bmp<= wdp       "mv '%i' '%i.bmp'; 'JxrEncApp' -i '%i.bmp' -o '%o.jxr'; mv '%i.bmp' '%i'; mv '%o.jxr' '%o"**: = "bmp<= wdp       "mv '%i' '%i.bmp'; 'JxrEncApp' -i '%i.bmp' -o '%o.jxr'; mv '%i.bmp' '%i'; mv '%o.jxr' '%o""

Defined in imageMagick/imLists.ts:1825

___

###  bpg =>          "bpgdec' -b 16 -o '%o.png' '%i'; mv '%o.png' '%o"

• **bpg =>          "bpgdec' -b 16 -o '%o.png' '%i'; mv '%o.png' '%o"**: = "bpg =>          "bpgdec' -b 16 -o '%o.png' '%i'; mv '%o.png' '%o""

Defined in imageMagick/imLists.ts:1827

___

###  cdr =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"

• **cdr =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"**: = "cdr =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o""

Defined in imageMagick/imLists.ts:1828

___

###  cgm =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"

• **cgm =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"**: = "cgm =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o""

Defined in imageMagick/imLists.ts:1829

___

###  dng:decode =>          "ufraw-batch' --silent --create-id=also --out-type=png --out-depth=16 '--output=%u.png' '%i"

• **dng:decode =>          "ufraw-batch' --silent --create-id=also --out-type=png --out-depth=16 '--output=%u.png' '%i"**: = "dng:decode =>          "ufraw-batch' --silent --create-id=also --out-type=png --out-depth=16 '--output=%u.png' '%i""

Defined in imageMagick/imLists.ts:1830

___

###  doc =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"

• **doc =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"**: = "doc =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o""

Defined in imageMagick/imLists.ts:1831

___

###  docx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"

• **docx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"**: = "docx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o""

Defined in imageMagick/imLists.ts:1832

___

###  dot =>          "dot' -Tsvg '%i' -o '%o"

• **dot =>          "dot' -Tsvg '%i' -o '%o"**: = "dot =>          "dot' -Tsvg '%i' -o '%o""

Defined in imageMagick/imLists.ts:1833

___

###  dvi =>          "dvips' -sstdout=%%stderr -o '%o' '%i"

• **dvi =>          "dvips' -sstdout=%%stderr -o '%o' '%i"**: = "dvi =>          "dvips' -sstdout=%%stderr -o '%o' '%i""

Defined in imageMagick/imLists.ts:1834

___

###  dxf =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"

• **dxf =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"**: = "dxf =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o""

Defined in imageMagick/imLists.ts:1835

___

###  eps<=>pdf       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 '-sDEVICE=pdfwrite' '-sOutputFile=%o' '-f%i"

• **eps<=>pdf       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 '-sDEVICE=pdfwrite' '-sOutputFile=%o' '-f%i"**: = "eps<=>pdf       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 '-sDEVICE=pdfwrite' '-sOutputFile=%o' '-f%i""

Defined in imageMagick/imLists.ts:1836

___

###  eps<=>ps        "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=ps2write' '-sOutputFile=%o' '-f%i"

• **eps<=>ps        "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=ps2write' '-sOutputFile=%o' '-f%i"**: = "eps<=>ps        "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=ps2write' '-sOutputFile=%o' '-f%i""

Defined in imageMagick/imLists.ts:1837

___

###  fig =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"

• **fig =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o"**: = "fig =>          "uniconvertor' '%i' '%o.svg'; mv '%o.svg' '%o""

Defined in imageMagick/imLists.ts:1838

___

###  hpg =>          "hp2xx' -sstdout=%%stderr -m eps -f `basename '%o'` '%i';     mv -f `basename '%o'` '%o"

• **hpg =>          "hp2xx' -sstdout=%%stderr -m eps -f `basename '%o'` '%i';     mv -f `basename '%o'` '%o"**: = "hpg =>          "hp2xx' -sstdout=%%stderr -m eps -f `basename '%o'` '%i';     mv -f `basename '%o'` '%o""

Defined in imageMagick/imLists.ts:1839

___

###  hpgl =>          "hp2xx' -sstdout=%%stderr -m eps -f `basename '%o'` '%i';     mv -f `basename '%o'` '%o"

• **hpgl =>          "hp2xx' -sstdout=%%stderr -m eps -f `basename '%o'` '%i';     mv -f `basename '%o'` '%o"**: = "hpgl =>          "hp2xx' -sstdout=%%stderr -m eps -f `basename '%o'` '%i';     mv -f `basename '%o'` '%o""

Defined in imageMagick/imLists.ts:1840

___

###  htm =>          "html2ps' -U -o '%o' '%i"

• **htm =>          "html2ps' -U -o '%o' '%i"**: = "htm =>          "html2ps' -U -o '%o' '%i""

Defined in imageMagick/imLists.ts:1841

___

###  html =>          "html2ps' -U -o '%o' '%i"

• **html =>          "html2ps' -U -o '%o' '%i"**: = "html =>          "html2ps' -U -o '%o' '%i""

Defined in imageMagick/imLists.ts:1842

___

###  https =>          "curl' -s -k -L -o '%o' 'https:%M"

• **https =>          "curl' -s -k -L -o '%o' 'https:%M"**: = "https =>          "curl' -s -k -L -o '%o' 'https:%M""

Defined in imageMagick/imLists.ts:1843

___

###  ilbm =>          "ilbmtoppm' '%i' > '%o"

• **ilbm =>          "ilbmtoppm' '%i' > '%o"**: = "ilbm =>          "ilbmtoppm' '%i' > '%o""

Defined in imageMagick/imLists.ts:1844

___

###  jpg<= lep       "lepton' '%i' '%o"

• **jpg<= lep       "lepton' '%i' '%o"**: = "jpg<= lep       "lepton' '%i' '%o""

Defined in imageMagick/imLists.ts:1845

___

###  jxr =>          "mv '%i' '%i.jxr'; 'JxrDecApp' -i '%i.jxr' -o '%o.pnm'; mv '%i.jxr' '%i'; mv '%o.pnm' '%o"

• **jxr =>          "mv '%i' '%i.jxr'; 'JxrDecApp' -i '%i.jxr' -o '%o.pnm'; mv '%i.jxr' '%i'; mv '%o.pnm' '%o"**: = "jxr =>          "mv '%i' '%i.jxr'; 'JxrDecApp' -i '%i.jxr' -o '%o.pnm'; mv '%i.jxr' '%i'; mv '%o.pnm' '%o""

Defined in imageMagick/imLists.ts:1846

___

###  lep =>          "lepton' '%i' '%o"

• **lep =>          "lepton' '%i' '%o"**: = "lep =>          "lepton' '%i' '%o""

Defined in imageMagick/imLists.ts:1847

___

###  mpeg:decode =>          "avconv' -v -1 -i '%i' -vframes %S -vcodec pam -an -f rawvideo -y '%u.pam' 2> '%u"

• **mpeg:decode =>          "avconv' -v -1 -i '%i' -vframes %S -vcodec pam -an -f rawvideo -y '%u.pam' 2> '%u"**: = "mpeg:decode =>          "avconv' -v -1 -i '%i' -vframes %S -vcodec pam -an -f rawvideo -y '%u.pam' 2> '%u""

Defined in imageMagick/imLists.ts:1848

___

###  odt =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"

• **odt =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"**: = "odt =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o""

Defined in imageMagick/imLists.ts:1849

___

###  pdf<=>eps       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 -sPDFPassword='%a' '-sDEVICE=eps2write' '-sOutputFile=%o' '-f%i"

• **pdf<=>eps       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 -sPDFPassword='%a' '-sDEVICE=eps2write' '-sOutputFile=%o' '-f%i"**: = "pdf<=>eps       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 -sPDFPassword='%a' '-sDEVICE=eps2write' '-sOutputFile=%o' '-f%i""

Defined in imageMagick/imLists.ts:1850

___

###  pdf<=>ps        "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=ps2write' -sPDFPassword='%a' '-sOutputFile=%o' '-f%i"

• **pdf<=>ps        "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=ps2write' -sPDFPassword='%a' '-sOutputFile=%o' '-f%i"**: = "pdf<=>ps        "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=ps2write' -sPDFPassword='%a' '-sOutputFile=%o' '-f%i""

Defined in imageMagick/imLists.ts:1851

___

###  png<= bpg       "bpgenc' -b 12 -q %~ -o '%o' '%i"

• **png<= bpg       "bpgenc' -b 12 -q %~ -o '%o' '%i"**: = "png<= bpg       "bpgenc' -b 12 -q %~ -o '%o' '%i""

Defined in imageMagick/imLists.ts:1852

___

###  png<= webp      "cwebp' -quiet -q %Q '%i' -o '%o"

• **png<= webp      "cwebp' -quiet -q %Q '%i' -o '%o"**: = "png<= webp      "cwebp' -quiet -q %Q '%i' -o '%o""

Defined in imageMagick/imLists.ts:1853

___

###  pnm<= ilbm      "ppmtoilbm' -24if '%i' > '%o"

• **pnm<= ilbm      "ppmtoilbm' -24if '%i' > '%o"**: = "pnm<= ilbm      "ppmtoilbm' -24if '%i' > '%o""

Defined in imageMagick/imLists.ts:1854

___

###  ppt =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"

• **ppt =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"**: = "ppt =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o""

Defined in imageMagick/imLists.ts:1855

___

###  pptx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"

• **pptx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"**: = "pptx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o""

Defined in imageMagick/imLists.ts:1856

___

###  ps<= print     "lpr '%i"

• **ps<= print     "lpr '%i"**: = "ps<= print     "lpr '%i""

Defined in imageMagick/imLists.ts:1860

___

###  ps<= prt       "lpr' '%i"

• **ps<= prt       "lpr' '%i"**: = "ps<= prt       "lpr' '%i""

Defined in imageMagick/imLists.ts:1857

___

###  ps<=>eps       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=eps2write' '-sOutputFile=%o' '-f%i"

• **ps<=>eps       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=eps2write' '-sOutputFile=%o' '-f%i"**: = "ps<=>eps       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=eps2write' '-sOutputFile=%o' '-f%i""

Defined in imageMagick/imLists.ts:1858

___

###  ps<=>pdf       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=pdfwrite' '-sOutputFile=%o' '-f%i"

• **ps<=>pdf       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=pdfwrite' '-sOutputFile=%o' '-f%i"**: = "ps<=>pdf       "gs' -sstdout=%%stderr -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=pdfwrite' '-sOutputFile=%o' '-f%i""

Defined in imageMagick/imLists.ts:1859

___

###  shtml =>          "html2ps' -U -o '%o' '%i"

• **shtml =>          "html2ps' -U -o '%o' '%i"**: = "shtml =>          "html2ps' -U -o '%o' '%i""

Defined in imageMagick/imLists.ts:1861

___

###  sid =>          "mrsidgeodecode' -if sid -i '%i' -of tif -o '%o' > '%u"

• **sid =>          "mrsidgeodecode' -if sid -i '%i' -of tif -o '%o' > '%u"**: = "sid =>          "mrsidgeodecode' -if sid -i '%i' -of tif -o '%o' > '%u""

Defined in imageMagick/imLists.ts:1862

___

###  svg =>          "rsvg-convert' -o '%o' '%i"

• **svg =>          "rsvg-convert' -o '%o' '%i"**: = "svg =>          "rsvg-convert' -o '%o' '%i""

Defined in imageMagick/imLists.ts:1863

___

###  tiff<= launch    "gimp' '%i"

• **tiff<= launch    "gimp' '%i"**: = "tiff<= launch    "gimp' '%i""

Defined in imageMagick/imLists.ts:1864

___

###  wdp =>          "mv '%i' '%i.jxr'; 'JxrDecApp' -i '%i.jxr' -o '%o.bmp'; mv '%i.jxr' '%i'; mv '%o.bmp' '%o"

• **wdp =>          "mv '%i' '%i.jxr'; 'JxrDecApp' -i '%i.jxr' -o '%o.bmp'; mv '%i.jxr' '%i'; mv '%o.bmp' '%o"**: = "wdp =>          "mv '%i' '%i.jxr'; 'JxrDecApp' -i '%i.jxr' -o '%o.bmp'; mv '%i.jxr' '%i'; mv '%o.bmp' '%o""

Defined in imageMagick/imLists.ts:1865

___

###  webp =>          "dwebp' -pam '%i' -o '%o"

• **webp =>          "dwebp' -pam '%i' -o '%o"**: = "webp =>          "dwebp' -pam '%i' -o '%o""

Defined in imageMagick/imLists.ts:1866

___

###  xls =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"

• **xls =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"**: = "xls =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o""

Defined in imageMagick/imLists.ts:1867

___

###  xlsx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"

• **xlsx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o"**: = "xlsx =>          "soffice' --convert-to pdf -outdir `dirname '%i'` '%i' 2> '%u'; mv '%i.pdf' '%o""

Defined in imageMagick/imLists.ts:1868
