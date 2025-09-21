<script lang="ts">
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

    // Dummy purchases data - replace with actual data store
    const purchases = [
        {
            id: 'ORD001',
            date: '2025-09-20',
            items: ['Grade 5 Science Notes', 'CBC Lesson Plan Template'],
            total: 2500,
            status: 'Completed'
        },
        {
            id: 'ORD002',
            date: '2025-09-15',
            items: ['Mathematics Workbook Grade 4'],
            total: 1200,
            status: 'Completed'
        }
    ];
</script>

<div class="space-y-6">
    <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">My Purchases</h2>
        <Button href="/products" color="primary">Browse More Resources</Button>
    </div>

    <div class="overflow-x-auto">
        <Table striped>
            <TableHead>
                <TableHeadCell>Order ID</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
                <TableHeadCell>Items</TableHeadCell>
                <TableHeadCell>Total (KES)</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody>
                {#each purchases as purchase}
                    <TableBodyRow>
                        <TableBodyCell>{purchase.id}</TableBodyCell>
                        <TableBodyCell>{purchase.date}</TableBodyCell>
                        <TableBodyCell>
                            <ul class="list-inside list-disc">
                                {#each purchase.items as item}
                                    <li>{item}</li>
                                {/each}
                            </ul>
                        </TableBodyCell>
                        <TableBodyCell>{purchase.total.toLocaleString()}</TableBodyCell>
                        <TableBodyCell>
                            <span
                                class="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800"
                                >{purchase.status}</span
                            >
                        </TableBodyCell>
                        <TableBodyCell>
                            <Button size="xs" href="/account/downloads">Download</Button>
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>

    {#if purchases.length === 0}
        <div class="rounded-lg bg-gray-50 p-8 text-center">
            <h3 class="mb-2 text-xl font-semibold">No Purchases Yet</h3>
            <p class="mb-4 text-gray-600">Start exploring our educational resources today!</p>
            <Button href="/products">Browse Resources</Button>
        </div>
    {/if}
</div>