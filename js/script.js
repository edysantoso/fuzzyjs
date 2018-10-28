function minus(a,b){
    return a-b;
}

function turun(a,b,c){
    return minus(c,a)/minus(c,b);
}

function naik(a,b,c){
    return minus(a,b)/minus(c,b);
}

function low(data,lowa,lowb){
    if(data<=lowa) 
        return 1;
    else if(data<lowb){
        return turun(data,lowa,lowb);
    }else return 0;
}

function mid(data,meda,medb,medc,medd){
    if ((data<=meda) || data>=medd)
        return 0;
    else if(data<medb){
        return naik(data,meda,medb);
    }else if(data<=medc)
        return 1;
    else
        return turun(data,medc,medd);
}

function hig(data,higa,higb){
    if (data<=higa)
        return 0;
    else if (data<higb){
        return naik(data,higa,higb);
    }else
        return 1;
}

function fuzzi(data,lowa,lowb,meda,medb,medc,medd,higa,higb){
    return ", "+low(data,lowa,lowb).toString()+", "+mid(data,meda,medb,medc,medd).toString()+", "+hig(data,higa,higb).toString();
}

function fuzzisation(data1,lowa,lowb,meda,medb,medc,medd,higa,higb,data2,lowa2,lowb2,meda2,medb2,medc2,medd2,higa2,higb2){
    return fuzzi(data1,lowa,lowb,meda,medb,medc,medd,higa,higb)+fuzzi(data2,lowa2,lowb2,meda2,medb2,medc2,medd2,higa2,higb2);
}


//fungsi fuzzification

function min(cell,a,b){
	return Math.min(cell[a],cell[b]);
}

function rejected(cell){
    return Math.max(Math. min(cell[6],cell[5]),Math.min(cell[6],cell[4]));
}

function considered(cell){
    return Math.max(Math.min(cell[8],cell[5]),Math.min(cell[7],cell[5]),Math.min(cell[7],cell[4]),Math.min(cell[6],cell[3]));
}

function accepted(cell){
    return Math.max(Math.min(cell[8],cell[4]),Math.min(cell[8],cell[3]),Math.min(cell[7],cell[3]));
}

function inference(data){
    var cell = data.split(",");
    return ", "+rejected(cell)+", "+considered(cell)+", "+accepted(cell);
}


//fungsi inference

function submaxdefuzzi(a,b,c,d){
    return Math.max(a[d],b[d],c[d]);
}

function maxdefuzzi(a,b,c){
    var hasil=[0,0,0,0,0,0,0,0,0,0];
    for(var i=0; i<hasil.length; i++){
        hasil[i]=submaxdefuzzi(a,b,c,i);
    }
    return hasil;
}

function subdefuzzi(aray,info){
    for(var i=0; i<aray.length; i++){
        aray[i]=Math.min(aray[i],info);
    }
    return aray;
}

function hitungnilai(a){
    var atas=0;
    var bawah=0;
    for(var i=0; i<a.length; i++){
        atas+=a[i]*(i*10+5);
        bawah+=a[i];
    }
    return atas/bawah;
}

function defuzzi(data,r,c,a){
    var cell=data.split(",");
    var re=subdefuzzi(r,cell[9]);
    var co=subdefuzzi(c,cell[10]);
    var ac=subdefuzzi(a,cell[11]);
    var b=maxdefuzzi(re,co,ac);
    return ", "+hitungnilai(b).toString();
}

//fungsi defuuzi

function proses(data,i){

    var lowinc_a=0.62;
    var lowinc_b=0.86;

    var medinc_a=0.49;
    var medinc_b=0.74;
    var medinc_c=1.01;
    var medinc_d=1.51;

    var higinc_a=0.99;
    var higinc_b=1.49;

    var lowhut_a=25.01;
    var lowhut_b=50.01;

    var medhut_a=24.09;
    var medhut_b=49.01;
    var medhut_c=75.01;
    var medhut_d=90.00;

    var highut_a=74.09;
    var highut_b=93.00;

	var r=[1,1,1,1,0.75,0.25,0,0,0,0];
    var c=[0,0,0,0,0.25,0.75,0.75,0.25,0,0];
    var a=[0,0,0,0,0,0,0.25,0.75,1,1];
    data[i]+=fuzzisation(data[i].split(",")[1],lowinc_a,lowinc_b,medinc_a,medinc_b,medinc_c,medinc_d,higinc_a,higinc_b,data[i].split(",")[2],lowhut_a,lowhut_b,medhut_a,medhut_b,medhut_c,medhut_d,highut_a,highut_b);
    data[i]+=inference(data[i]);
    data[i]+=defuzzi(data[i],r,c,a);
    return data[i];
}

//proses algoritma fuzzi

function cari(x,a){
    var bool=true;
    var i=0;
    while ((bool)&&(i<x.length)){
        if(x[i]==a) bool=false;
        i++
    }
    return bool;
}

function urutkan(data){
    var hasil=[];
    for (var i=1; i<data.length; i++){
        var max=0;
        var idx=0;
        for(var j=1; j<data.length; j++){
            var cell=data[j].split(",");
            if (i==1){
                if (max<cell[12]) {
                    max=cell[12];
                    idx=j;
                }
            }else{
                if (cari(hasil,j) && (max < cell[12])) {
                    max=cell[12];
                    idx=j;
                }
            }
        }   
        hasil.push(idx);
    }
    return hasil;
}

//fungsi pengurutan

