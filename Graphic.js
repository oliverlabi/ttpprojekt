class Graphic extends CurriculumCalculator {
	
	


	/*window.onload = function(){
		
	}*/

	/*draw_graph(){
		/*let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		let fullTimeEdu, partTimeEdu, TäiskoormusFullEduLimit, payload, this.universityAttendance, this.ectsCount;
		let payload = this.studyLoad;
		console.log(this.studyLoad);
		Graphic.prototype.clear_canvas(this);
		Graphic.prototype.draw_base(this);
		//draw_base();
		if(payload == "Täiskoormus"){
			Graphic.prototype.draw_freeMargins(this);
			//draw_TäiskoormusMargins();
		} else if(payload == "Osakoormus"){
			Graphic.prototype.draw_paidMargins(this);
			//draw_OsakoormusMargins();
		}
		Graphic.prototype.draw_data(this);
		Graphic.prototype.draw_student(this);
		//draw_data();
		//draw_student();
		
	}*/

	clear_canvas(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		ctx.fillStyle = "white";
		ctx.beginPath();
			ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.closePath();
		ctx.fill();
	}

	/*calculate_data(){
		
		let fullTimeEdu = this.fullStudyLoadLowerLimit;
		let partTimeEdu = (this.universityAttendance* 15); //siia panna +15 pärast??
		let TäiskoormusFullEduLimit = (this.universityAttendance * 30) - 6;
		
	}*/

	draw_base(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		//kasti suurust muuta ainult siit graphX ja graphY juurest
		ctx.strokeStyle = "rgba(112, 203, 188, 1)";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(graphX, graphY, canvas.width - 2*graphX, canvas.height - 2*graphY);
			/* width ja height peavad olema 2*graphX ja 2*graphY, et ta kuvaks sees olevat kasti sümmeertiliselt*/
		ctx.closePath();
		ctx.stroke();

	}

	draw_freeMargins(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(graphX+graphBorderWidth, graphY+graphBorderWidth, ((canvas.width - 2*graphX)*1/3) - graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		ctx.strokeStyle = "orange";
		ctx.fillStyle = "orange";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(((canvas.width-2*graphX)*1/3)+graphX, graphY+graphBorderWidth, (((canvas.width)-2*graphX)/2)*(2/3)- graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		ctx.strokeStyle = "yellow";
		ctx.fillStyle = "yellow";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth),graphY+graphBorderWidth, (((canvas.width)-2*graphX)/2)*(3/6)- graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		ctx.strokeStyle = "green";
		ctx.fillStyle = "green";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), graphY+graphBorderWidth, (((canvas.width)-2*graphX)/2)*(1/6)- graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}

	draw_paidMargins(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(graphX+graphBorderWidth, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/2) - graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		ctx.strokeStyle = "green";
		ctx.fillStyle = "green";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect((canvas.width / 2)+graphBorderWidth, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/2) - graphBorderWidth*2, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
	}

	draw_data(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		let fullTimeEdu = this.fullStudyLoadLowerLimit;
		console.log(this.fullStudyLoadLowerLimit);
		let partTimeEdu = (this.universityAttendance* 15); //siia panna +15 pärast??
		let freeFullEduLimit = (this.universityAttendance * 30) - 6;
		let payload = this.studyLoad;
		ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			if(payload == "Osakoormus"){
				ctx.moveTo((canvas.width / 2), graphY+(graphBorderWidth/2));
				ctx.lineTo((canvas.width / 2), (canvas.height - graphY)-(graphBorderWidth/2));
			} else if(payload == "Täiskoormus"){
				ctx.moveTo(((canvas.width-2*graphX)*1/3)+graphX, graphY+(graphBorderWidth/2));
				ctx.lineTo(((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY)-(graphBorderWidth/2));
			}
			ctx.stroke();
			ctx.font = "20px arial";
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.fillText(0, graphX+graphBorderWidth, graphY - graphBorderWidth*2);
			if(payload == "Osakoormus"){	
				ctx.fillText(partTimeEdu, canvas.width/2, graphY - graphBorderWidth*2);
				ctx.font = "12px arial";
				ctx.fillText("Õppes jätkamise", canvas.width/2, (canvas.height - graphY) + graphBorderWidth*5);
				ctx.fillText("alampiir", canvas.width/2, (canvas.height - graphY) + graphBorderWidth*9);
			} else if(payload == "Täiskoormus"){		
				ctx.fillText(partTimeEdu, ((canvas.width-2*graphX)*1/3)+graphX, graphY - graphBorderWidth*2);
				ctx.font = "12px arial";
				ctx.fillText("Õppes jätkamise", ((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY) + graphBorderWidth*5);
				ctx.fillText("alampiir", ((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY) + graphBorderWidth*9);
			}
			ctx.font = "16px arial";
			ctx.textAlign = "left";
			ctx.fillText("EAP-de alampiiride skaala:", graphX, graphY - graphBorderWidth*4 -20);
		ctx.closePath();
		
		if(payload == "Täiskoormus"){
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 2;
				ctx.moveTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), graphY+(graphBorderWidth/2));
				ctx.lineTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
				ctx.font = "20px arial";
				ctx.fillStyle = "black";
				ctx.textAlign = "center";		
				ctx.fillText(fullTimeEdu, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), graphY - graphBorderWidth*2);
				ctx.font = "12px arial";
				ctx.fillText("Täiskoormuse", ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*5);
				ctx.fillText("alampiir", ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*9);
			ctx.closePath();
		}
		
		if(payload == "Täiskoormus"){
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 2;
				ctx.moveTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), graphY+(graphBorderWidth/2));
				ctx.lineTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
				ctx.font = "20px arial";
				ctx.fillStyle = "black";
				ctx.textAlign = "center";		
				ctx.fillText(freeFullEduLimit, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), graphY - graphBorderWidth*2);
				ctx.font = "12px arial";
				ctx.fillText("Tasuta õppe", ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*5);
				ctx.fillText("puhverruum", ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*9);
			ctx.closePath();
		}
	}

	draw_student(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		let fullTimeEdu = this.fullStudyLoadLowerLimit;
		let partTimeEdu = (this.universityAttendance* 15); //siia panna +15 pärast??
		let freeFullEduLimit = (this.universityAttendance * 30) - 6;
		let XLength;
		let XPosition;
		let arrowX;
		if(this.ectsCount < partTimeEdu){
			XLength = (canvas.width-2*graphX)/2;
			XPosition = (this.ectsCount/partTimeEdu)*XLength;
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 4;
				ctx.moveTo(graphX + graphBorderWidth + XPosition, graphY+(graphBorderWidth/2));
				ctx.lineTo(graphX + graphBorderWidth + XPosition, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			ctx.closePath();
			arrowX = graphX + graphBorderWidth + XPosition;
		}
		if(this.ectsCount >= partTimeEdu && this.ectsCount < fullTimeEdu){
			XLength = ((canvas.width-2*graphX)/2)*(1/3);
			XPosition = ((this.ectsCount - partTimeEdu)/(fullTimeEdu - partTimeEdu))*XLength;
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 4;
				ctx.moveTo((canvas.width / 2) + XPosition, graphY+(graphBorderWidth/2));
				ctx.lineTo((canvas.width / 2) + XPosition, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			ctx.closePath();
			arrowX = (canvas.width / 2) + XPosition;
		}
		if(this.ectsCount >= fullTimeEdu && this.ectsCount < freeFullEduLimit){
			XLength = ((canvas.width-2*graphX)/2)*(3/6);
			XPosition = ((this.ectsCount - fullTimeEdu)/(freeFullEduLimit - fullTimeEdu))*XLength;
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 4;
				ctx.moveTo((canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(1/3)) + XPosition, graphY+(graphBorderWidth/2));
				ctx.lineTo((canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(1/3)) + XPosition, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			ctx.closePath();
			arrowX = (canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(1/3)) + XPosition;
		}
		if(this.ectsCount >= freeFullEduLimit){
			XLength = ((canvas.width-2*graphX)/2)*(1/6);
			if(this.ectsCount >= (this.universityAttendance*30)){
				XPosition = 1 * XLength;
			} else {
			XPosition = ((this.ectsCount - freeFullEduLimit)/((this.universityAttendance*30) - freeFullEduLimit))*XLength;
			}
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 4;
				ctx.moveTo((canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(5/6)) + XPosition, graphY+(graphBorderWidth/2));
				ctx.lineTo((canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(5/6)) + XPosition, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			ctx.closePath();
			arrowX = (canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(5/6)) + XPosition;
			
		}
		ctx.fillStyle = "black";
		ctx.strokeStyle = 1;
		//legendi muutuja
		let legendX = (canvas.width * (4/5));
		if((arrowX-graphX-graphBorderWidth)<(graphBorderWidth*3)){
			ctx.beginPath();
				ctx.moveTo(arrowX+graphBorderWidth*3, (canvas.height/2)-2*graphBorderWidth);
				ctx.lineTo(arrowX+graphBorderWidth*3, (canvas.height/2)+2*graphBorderWidth);
				ctx.lineTo(arrowX+graphBorderWidth, canvas.height/2); 
				ctx.fill();
			ctx.closePath();
			ctx.beginPath();
				ctx.moveTo(legendX+graphBorderWidth*3, (canvas.height/12)-2*graphBorderWidth);
				ctx.lineTo(legendX+graphBorderWidth*3, (canvas.height/12)+2*graphBorderWidth);
				ctx.lineTo(legendX+graphBorderWidth, canvas.height/12); 
				ctx.fill();
			ctx.closePath();
		} else {
			ctx.beginPath();
				ctx.moveTo(arrowX-graphBorderWidth*3, (canvas.height/2)-2*graphBorderWidth);
				ctx.lineTo(arrowX-graphBorderWidth*3, (canvas.height/2)+2*graphBorderWidth);
				ctx.lineTo(arrowX-graphBorderWidth, canvas.height/2); 
				ctx.fill();
			ctx.closePath();
			ctx.beginPath();
				ctx.moveTo(legendX+graphBorderWidth, (canvas.height/12)-2*graphBorderWidth);
				ctx.lineTo(legendX+graphBorderWidth, (canvas.height/12)+2*graphBorderWidth);
				ctx.lineTo(legendX+graphBorderWidth*3, canvas.height/12); 
				ctx.fill();
			ctx.closePath();
			
		}	
			ctx.beginPath();
				ctx.fillStyle = "black";
				ctx.textAlign = "left";		
				ctx.font = "12px arial";
				ctx.fillText(" Sina oled siin", legendX+graphBorderWidth*4, canvas.height/12+graphBorderWidth*1.5);
			ctx.closePath();
	}
}