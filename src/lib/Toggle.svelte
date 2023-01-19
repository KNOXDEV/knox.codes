<script lang="ts">
    export let title = "Click to show"
    let show = false;
    $: icon = show ? '&#x2BC6;' : '&#x2BC8;';

    const toggle = () => {
        show = !show;
    };

</script>

<div class="flex flex-row">
    <div>
        <button on:click={toggle} class="hover:bg-gray-100 active:bg-gray-200 px-1.5 rounded-md grow-0 mr-1">{@html icon}</button>
    </div>
    <div>
        <strong>{title}</strong>
        {#if show}
            <slot />
        {/if}
    </div>
</div>