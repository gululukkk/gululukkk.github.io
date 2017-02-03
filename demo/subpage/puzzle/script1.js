
	function insertAfter(newElem,oldElem) {
		var parent = oldElem.parentNode;

		if (oldElem.nextSibling) {
			parent.insertBefore(newElem,oldElem.nextSibling);
		} else {
			parent.appendChild(newElem);
		}

	}

	function dragstart(Elem) {
		var index;

		function getIndex(Elem) {
			index = $(Elem).index();
		}
		getIndex(Elem);
		return index;
	}

	function dragenter(e) {
		e.preventDefault();
	}

	function dragover(e) {
		e.preventDefault();
	}

	function drop(index,Elem) {
		var draged_Elem = clip_div[index],
			draged_Elem_Sib = draged_Elem.previousSibling,
			replaced_Elem;
		replaced_Elem = Elem.parentNode.replaceChild(draged_Elem,Elem);

		if (replaced_Elem == draged_Elem_Sib) {
			insertAfter(replaced_Elem,draged_Elem);
		} else {
			insertAfter(replaced_Elem,draged_Elem_Sib);
		}
		
	}

	for (var i = clip_div.length - 1; i >= 0; i--) {
		var a = clip_div[i];
		a.ondragstart = function(e) {
			var index = dragstart(this);
			e.dataTransfer.setData("Text",index);
		}

		a.ondragenter = function(e) {
			dragenter(e);
		}

		a.ondragover = function(e) {
			dragover(e);
		}

		a.ondrop = function(e) {
			e.stopPropagation();
			e.preventDefault();
			index = e.dataTransfer.getData("Text"),
			drop(index,this);
		}
	}