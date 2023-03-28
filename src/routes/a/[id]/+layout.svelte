<script>
	import SpaceNav from '../../base/[space]/SpaceNav.svelte';
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownItem,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<SpaceNav />

<div class="dark:bg-gray-900  min-h-112 pb-64 pt-20">
	<div class="flex dark:bg-gray-900 ">
		{#if !/\/accounts/.test($page.url.pathname) && !/\/welcome/.test($page.url.pathname)}
			<div class="hidden md:block lg:block pt-6">
				<Sidebar>
					<SidebarWrapper class="max-h max-h-100 h-100 fixed w-64 ml-4 overflow-auto">
						<SidebarGroup>
							<SidebarItem href={`/base/${$page.params.id}`} rel="external" label="Collections" />
							<SidebarItem href={`/dashboards/${$page.params.id}`} label="Dashboard" />
							<SidebarItem href={`/editor/${$page.params.id}`} label="UI" />
							<SidebarItem href={`/spaces/${$page.params.id}`} label="Config" />
						</SidebarGroup>
					</SidebarWrapper>
				</Sidebar>
			</div>
		{/if}
		<div class="flex-1  ">
			<slot />
		</div>
	</div>
</div>

