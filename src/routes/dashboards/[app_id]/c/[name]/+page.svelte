<script lang="ts">
	import { onMount, onDestroy,  afterUpdate, beforeUpdate} from "svelte";


	let me: string;
	me = 'Brian Odida';
	function doSumn() {
		// return me;
        me="knn"
	}
	const doSumn2 = () => {};

    var me2 = "hehe" + me

    let me3 = "hoho" + me

    const me4 = "knkn" + me

    doSumn2()


    while(typeof me === "string"){
        me = "4"
    }

    onMount(doSumn)

onDestroy(doSumn)

afterUpdate(doSumn)

beforeUpdate(doSumn)

</script>
