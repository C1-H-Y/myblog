---
title: 03.2.1 格点上与 hopping 元素的矩阵结构
categories:
  - kwant
--- 

这是一个考虑自旋轨道耦合和塞曼效应情况下二维电子的哈密顿量：

$$
H = \frac{-\hbar^2}{2m}(\partial_x^2 + \partial_y^2) - i\alpha(\partial_x \sigma_y - \partial_y \sigma_x) + E_Z \sigma_z + V(y)
$$

这个已经被研究得很彻底的哈密顿量在 nanowire 等系统中有很重要的性质，在这里我们将展示只要在之前的代码基础上略加改动就可以展示这种哈密顿量所导致的行为。

用到的是 `tinyarray` 包，简单起见，我们先定义泡利矩阵：

```python
sigma_0 = tinyarray.array([[1, 0], [0, 1]])
sigma_x = tinyarray.array([[0, 1], [1, 0]])
sigma_y = tinyarray.array([[0, -1j], [1j, 0]])
sigma_z = tinyarray.array([[1, 0], [0, -1]])
```

准确地来说，这样我们的波函数就应该用 spinor 表示，也就是说态空间整个就变成了一堆 spinor 的直积。相应的，hopping 项也应该表示为矩阵的形式，当然在代码中他已经写好相应的方法了，我们只用这么写：

```python
syst[(lat(x, y) for x in range(L) for y in range(W))] = \
    4 * t * sigma_0 + e_z * sigma_z
# hoppings in x-direction
syst[kwant.builder.HoppingKind((1, 0), lat, lat)] = \
    -t * sigma_0 + 1j * alpha * sigma_y / 2
# hoppings in y-directions
```

剩下的部分是不变的，总的代码如下：

```python
import kwant
import tinyarray
import matplotlib.pyplot as plt

alpha = 0.01
e_z = 0.03
a = 1
t = 1.0
W = 10
L = 30

syst = kwant.Builder()

# definition of the matrix
sigma_0 = tinyarray.array([[1, 0], [0, 1]])
sigma_x = tinyarray.array([[0, 1], [1, 0]])
sigma_y = tinyarray.array([[0, -1j], [1j, 0]])
sigma_z = tinyarray.array([[1, 0], [0, -1]])

lat = kwant.lattice.square(a, norbs=1)

syst[(lat(x, y) for x in range(L) for y in range(W))] = 4 * t * sigma_0 + e_z * sigma_z
syst[kwant.builder.HoppingKind((1, 0), lat, lat)] = -t * sigma_0 + 1j * alpha * sigma_y / 2
syst[kwant.builder.HoppingKind((0, 1), lat, lat)] = -t * sigma_0 - 1j * alpha * sigma_x / 2

lead = kwant.Builder(kwant.TranslationalSymmetry((-a, 0)))
lead[(lat(0, j) for j in range(W))] = 4 * t * sigma_0 + e_z * sigma_z
# hoppings in x-direction
lead[kwant.builder.HoppingKind((1, 0), lat, lat)] = \
    -t * sigma_0 + 1j * alpha * sigma_y / 2
# hoppings in y-directions
lead[kwant.builder.HoppingKind((0, 1), lat, lat)] = \
    -t * sigma_0 - 1j * alpha * sigma_x / 2
syst.attach_lead(lead)
syst.attach_lead(lead.reversed())

syst = syst.finalized()
energies = []
data = []
for ie in range(100):
    energy = ie * 0.01 - 0.25

    # compute the scattering matrix at a given energy
    smatrix = kwant.smatrix(syst, energy)

    # compute the transmission probability of transition
    energies.append(energy)
    data.append(smatrix.transmission(1, 0))

plt.figure()
plt.plot(energies, data)
plt.xlabel("energy [t]")
plt.ylabel("conductance [e^2/h]")
plt.show()
```

画出来可以看出出现新的阶梯结构，来源于自旋对称与反对称能级的劈裂：

<div align="center">
  <img src="/images/1.2.1.png" width="500" alt="自旋轨道耦合情况下的电导率分布"/>
</div>

*图 1.2.1　自旋轨道耦合情况下的电导率分布*
